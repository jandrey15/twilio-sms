const joi = require('@hapi/joi')

const smsIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const smsMessageSchema = joi.string().max(80)
const smsToSchema = joi.string().max(20)
// const smsToSchema = joi.number().min(1).max(9)
const smsCreate_dtSchema = joi.date().timestamp()

const createSmsSchema = {
  message: smsMessageSchema.required(),
  phone: smsToSchema.required(),
  create_dt: smsCreate_dtSchema.required(),
}

module.exports = {
  smsIdSchema,
  createSmsSchema,
}
