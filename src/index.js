'use strict'

const { app } = require('./server')
const { config } = require('./config/index')

// On port
const port = config.port

app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`)
})
