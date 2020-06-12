'use strict'

const express = require('express')
const path = require('path')
const app = express()

const homeRouter = require('./routes/views/home')

// Middlewares

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')))

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Routes
app.use('/', homeRouter)

module.exports = {
  app,
}
