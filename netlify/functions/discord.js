const {URL} = require('url')
const nodemailer = require('nodemailer')
const ow = require('ow')
const unified = require('unified')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const doc = require('rehype-document')
const format = require('rehype-format')
const html = require('rehype-stringify')
const {username} = require('os').userInfo()

function markdownToHtml(markdownString) {
  return unified()
    .use(markdown)
    .use(remark2rehype)
    .use(doc)
    .use(format)
    .use(html)
    .process(markdownString)
    .then(x => x.contents)
}

const isEmail = ow.string.is(e => /^.+@.+\..+$/.test(e))

function owWithMessage(val, message, validator) {
  try {
    ow(val, validator)
  } catch (error) {
    throw new Error(message)
  }
}

owWithMessage(
  process.env.EMAIL_PASSWORD,
  'EMAIL_PASSWORD environment variable is not set',
  ow.string.minLength(1),
)
owWithMessage(
  process.env.EMAIL_USERNAME,
  'EMAIL_USERNAME environment variable is not set to an email',
  isEmail,
)

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}
async function handler(event) {
  const runId = Date.now().toString().slice(-5)
  // eslint-disable-next-line no-console
  const log = (...args) => console.log(runId, ...args)

  const origin = new URL(event.headers.origin)
  const acceptable =
    (origin.hostname === 'localhost' && username === 'kentcdodds') ||
    origin.hostname === 'kentcdodds.com'

  if (!acceptable) {
    return {
      statusCode: 403,
      body: JSON.stringify({message: 'Unacceptable request'}),
      headers,
    }
  }
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      body: 'CORS ok',
      headers,
    }
  }
  const {first_name: name, email_address: email, acceptedCoC} = JSON.parse(
    event.body,
  )

  try {
    log('> Validating input', ' name: ', name, ' email:', email)
    owWithMessage(name, 'The name is required.', ow.string.minLength(1))
    owWithMessage(name, 'The name is too long.', ow.string.maxLength(60))
    owWithMessage(
      email,
      'The email is invalid. Please enter a valid email address.',
      isEmail,
    )
    owWithMessage(
      acceptedCoC,
      'Must accept the Code of Conduct.',
      ow.boolean.is(b => b === true),
    )
  } catch (e) {
    log('> Validation failed', e.message)
    return {
      statusCode: 403,
      body: JSON.stringify({message: e.message}),
      headers,
    }
  }

  // TODO: work with the discord API to generate the discord invite URL
  const text = `
Hello ${name},

Congratulations and welcome! Your application has been approved and can now  **[join the KCD Community on Discord](https://discord.gg/4zZT9rd)**. We're happy to have you!

When you join, you'll be greeted by a bot with more instructions and tips. For now, simply click the link above. See you soon!

– Kent

P.S. It's more fun with your friends, [invite them to join us](https://twitter.com/intent/tweet?url=https%3A%2F%2Fkentcdodds.com%2Fdiscord&text=I've%20joined%20the%20KCD%20Discord%20community%2C%20come%20hang%20out%20with%20us%20%F0%9F%92%AC&via=kentcdodds)!

[![Kent doing a flip on rollerblades](https://media.giphy.com/media/SwOkV0xTEZMXUM1BTr/giphy.gif)](https://twitter.com/kentcdodds/status/1116215606213214208)

(yes, [that's me](https://twitter.com/kentcdodds/status/1116215606213214208))
`.trim()

  const message = {
    from: `"Kent C. Dodds" <hello@kentcdodds.com>`,
    to: `"${name}" <${email}>`,
    subject: 'KCD Discord: Application approved',
    text,
    html: await markdownToHtml(text),
  }

  try {
    log('> Sending...')
    await transporter.verify()
    await transporter.sendMail(message)
    log('> Send success!')
  } catch (error) {
    log('> Send failure!', error.message)
    return {
      statusCode: 500,
      body: JSON.stringify({message: error.message}),
      headers,
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({success: true}),
    headers,
  }
}

module.exports = {handler}
