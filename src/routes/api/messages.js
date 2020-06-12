const express = require('express')
const { sendSms } = require('../../twilio/sendsms')
// const MessagesService = require('../../services/messages')
// const validation = require('../../utils/middlewares/validationHandler')

// const {
//   createMessageSchema,
// } = require('../../utils/schemas/messages')

function messagesApi(app) {
  const router = express.Router()
  app.use('/api/messages', router)

  // const messageService = new MessagesService()

  router.get('/', async (req, res, next) => {
    try {
      const products = await messageService.getProducts({})

      res.status(200).json({
        data: products,
        message: 'messages listed',
      })
    } catch (err) {
      next(err)
    }
  })

  router.post('/', async (req, res, next) => {
    const { body: sms } = req

    const smsRes = await sendSms(sms.message, sms.phone, next)
    console.info(smsRes.sid)
    res.send('Ok todo bien')

    // try {
    //   const createProduct = await messageService.createProduct({ product })

    //   res.status(201).json({
    //     data: createProduct,
    //     message: 'product created',
    //   })
    // } catch (err) {
    //   next(err)
    // }
  })
}

module.exports = messagesApi
