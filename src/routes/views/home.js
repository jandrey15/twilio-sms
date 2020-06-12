const epxress = require('express')
const router = epxress.Router()

const { config } = require('../../config')

router.get('/', async function (req, res, next) {
  try {
    res.render('home', { message: 'My name is John Serrano', dev: config.dev })
  } catch (err) {
    next(err)
  }
})

module.exports = router
