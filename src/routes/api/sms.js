const express = require('express')
const { sendSms } = require('../../twilio/sendsms')
const SmsService = require('../../services/sms')
const validationHandler = require('../../utils/middlewares/validationHandler')

const { createSmsSchema } = require('../../utils/schemas/sms')

function smsApi(app) {
  const router = express.Router()
  app.use('/api/sms', router)

  const smsService = new SmsService()

  router.get('/', async (req, res, next) => {
    const { tags } = req.query

    try {
      const smsAll = await smsService.getSmsAll({ tags })

      res.status(200).json({
        data: smsAll,
        message: 'sms listed',
      })
    } catch (err) {
      next(err)
    }
  })

  router.post(
    '/',
    validationHandler(createSmsSchema),
    async (req, res, next) => {
      const { body: sms } = req

      try {
        const createdSmsId = await smsService.createSms({ sms })
        console.log(createdSmsId)

        const smsRes = await sendSms(sms.message, sms.phone, next)
        console.info(smsRes.sid)

        res.status(201).json({
          data: createdSmsId,
          message: 'sms created',
        })
      } catch (err) {
        next(err)
      }
    }
  )
}

module.exports = smsApi
