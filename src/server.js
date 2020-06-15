'use strict'

const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()

const homeRouter = require('./routes/views/home')
const smsApiRouter = require('./routes/api/sms')

const {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler,
} = require('./utils/middlewares/errorsHandlers')
const notFoundHandler = require('./utils/middlewares/notFoundHandler')

// Middlewares
app.use(morgan('dev'))
app.use(express.json()) // Via api object json
app.use(express.urlencoded({ extended: false })) // Via form post

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')))

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Routes
app.use('/', homeRouter)
smsApiRouter(app)

// Catch 404
app.use(notFoundHandler)

// error handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

module.exports = {
  app,
}
