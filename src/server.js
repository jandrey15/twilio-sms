'use strict'

const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()

const homeRouter = require('./routes/views/home')
const messagesApiRouter = require('./routes/api/messages')

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
messagesApiRouter(app)

module.exports = {
  app,
}
