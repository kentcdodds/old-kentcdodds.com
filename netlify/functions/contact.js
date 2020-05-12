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
  const {name, email, subject, body, ...otherData} = JSON.parse(event.body)

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
      subject,
      'The subject is too short. Please be more specific.',
      ow.string.minLength(5),
    )
    owWithMessage(
      subject,
      'The subject is too long. Please shorten it.',
      ow.string.maxLength(120),
    )
    owWithMessage(
      body,
      'The email body is too short. Give me more details please.',
      ow.string.minLength(40),
    )
    owWithMessage(
      body,
      'The email body is too long. Be more succinct please.',
      ow.string.maxLength(1001),
    )
  } catch (e) {
    log('> Validation failed', e.message)
    return {
      statusCode: 403,
      body: JSON.stringify({message: e.message}),
      headers,
    }
  }

  const otherDataString = JSON.stringify(otherData, null, 2)

  const text = `${body}\n\n---\n\nOther form data:\n\`\`\`\n${otherDataString}\n\`\`\`\n`
  const sender = `"${name}" <${email}>`

  const message = {
    from: sender,
    to: `"Kent C. Dodds" <me@kentcdodds.com>`,
    subject,
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
