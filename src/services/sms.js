const MongoLib = require('../lib/mongo')

class SmsService {
  constructor() {
    this.collection = 'twilio-sms'
    this.mongoDB = new MongoLib()
  }

  async getSmsAll({ tags }) {
    const query = tags && { tags: { $in: tags } }
    const smsAll = await this.mongoDB.getAll(this.collection, query)
    return smsAll || []
  }

  async createSms({ sms }) {
    const createSmsId = await this.mongoDB.create(this.collection, sms)
    return createSmsId
  }
}

module.exports = SmsService
