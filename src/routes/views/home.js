const epxress = require('express')
const router = epxress.Router()

const { sendSms } = require('../../twilio/sendsms')
const SmsService = require('../../services/sms.js')
const validationHandler = require('../../utils/middlewares/validationHandler')

const { smsIdSchema, createSmsSchema } = require('../../utils/schemas/sms')

const { config } = require('../../config')

const smsService = new SmsService()

router.get('/', async function (req, res, next) {
  const { tags } = req.query

  try {
    const smsAll = await smsService.getSmsAll({ tags })
    res.render('home', { messages: smsAll, dev: config.dev })
  } catch (err) {
    next(err)
  }
})

router.post(
  '/send-sms',
  validationHandler(createSmsSchema),
  async (req, res, next) => {
    const { body: sms } = req

    try {
      const createdSmsId = await smsService.createSms({ sms })
      console.log(createdSmsId)

      const smsRes = await sendSms(sms.message, sms.phone, next)
      console.info(smsRes.sid)

      res.redirect('/')
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
