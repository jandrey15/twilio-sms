const { config } = require('../../config')

const client = require('twilio')(config.accountSid, config.authToken)

const sendSms = async (body, phone, next) => {
  try {
    const message = await client.messages.create({
      to: phone,
      from: '+15307716367',
      body,
    })
    return message
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = { sendSms }
