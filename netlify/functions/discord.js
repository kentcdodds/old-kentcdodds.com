const {URL} = require('url')
const Discord = require('discord.js')
const ow = require('ow')
const axios = require('axios')
const osUserInfo = require('os').userInfo()

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

const client = new Discord.Client()
const clientReadyDeferred = deferred()

client.on('ready', error => {
  if (error) {
    clientReadyDeferred.reject(error)
  } else {
    clientReadyDeferred.resolve()
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)

const isEmail = ow.string.is(e => /^.+@.+\..+$/.test(e))
const isDiscordUsername = ow.string.is(e => /^.+#.+$/.test(e))

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
    (origin.hostname === 'localhost' && osUserInfo.username === 'kentcdodds') ||
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
  const {name, email, username, acceptedCoC} = JSON.parse(event.body)

  try {
    log('> Validating input', {name, email, username})
    owWithMessage(name, 'The name is required.', ow.string.minLength(1))
    owWithMessage(name, 'The name is too long.', ow.string.maxLength(60))
    owWithMessage(
      username,
      'The username is invalid. Please enter a valid discord username (example#1234).',
      isDiscordUsername,
    )
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

  await axios.post('https://app.convertkit.com/forms/1547100/subscriptions', {
    data: {first_name: name, email_address: email},
  })

  try {
    await clientReadyDeferred.promise

    const kcdGuild = client.guilds.cache.get('715220730605731931')

    const role = kcdGuild.roles.cache.find(r => r.name === 'Member')
    const member = kcdGuild.members.cache.find(
      ({user}) => `${user.username}#${user.discriminator}` === username,
    )

    member.roles.add(role)
  } catch (error) {
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
