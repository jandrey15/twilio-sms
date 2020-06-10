const { app } = require('./server')
const { config } = require('./config/index')
const MongoLib = require('./lib/mongo')

// On port
const port = config.port

//Mongo
const db = new MongoLib()
db.connect()

app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`)
})
