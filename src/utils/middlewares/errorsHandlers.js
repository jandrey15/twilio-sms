const boom = require('@hapi/boom')
const debug = require('debug')('app:error')
const { config } = require('../../config')
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi')

function withErrorStack(err, stack) {
  if (config.dev) {
    // console.table(err)
    return { ...err, stack } // Object.assign({}, err, stack)
  }

  return err
}

function logErrors(err, req, res, next) {
  debug(err.stack)
  // console.log(err.stack)
  next(err)
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err))
  }

  next(err)
}

function clientErrorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err

  // catch errors for AJAX request or if an error ocurrs while streaming
  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack))
  } else {
    next(err)
  }
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err

  res.status(statusCode)
  res.render('error', withErrorStack(payload, err.stack))
}

module.exports = {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler,
}
