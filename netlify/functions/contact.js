const nodemailer = require('nodemailer')
const ow = require('ow')
const {markdownToHtml} = require('../utils')

const isEmail = ow.string.is(e => /^.+@.+\..+$/.test(e))

ow(
  process.env.EMAIL_PASSWORD,
  'EMAIL_PASSWORD environment variable is not set',
  ow.string.minLength(1),
)
ow(
  process.env.EMAIL_USERNAME,
  'EMAIL_USERNAME environment variable is not set',
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

exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      body: 'CORS ok',
      headers,
    }
  }
  await transporter.verify()
  const body = JSON.parse(event.body)

  try {
    ow(body.name, 'Name is too short', ow.string.minLength(1))
    ow(body.name, 'Name is too long', ow.string.maxLength(60))
    ow(body.email, 'Email is invalid', isEmail)
    ow(
      body.subject,
      'Please keep the subject to a reasonable length',
      ow.any(ow.string.minLength(5), ow.string.maxLength(120)),
    )
    ow(
      body.body,
      'Please keep the body to a reasonable length',
      ow.any(ow.string.minLength(40), ow.string.maxLength(1001)),
    )
  } catch (e) {
    return Promise.reject({
      statusCode: 403,
      body: e.message,
      headers,
    })
  }

  const message = {
    from: `"${body.name}" <${body.email}>`,
    to: `"Kent C. Dodds" <kent@doddsfamily.us>`,
    subject: body.subject,
    text: body.body,
    html: await markdownToHtml(body.body),
  }

  try {
    await transporter.sendMail(message)
  } catch (error) {
    return Promise.reject({
      statusCode: 500,
      body: error.message,
      headers,
    })
  }

  return {
    statusCode: 200,
    body: JSON.stringify({success: true}),
    headers,
  }
}
