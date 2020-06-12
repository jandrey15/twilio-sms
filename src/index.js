'use strict'

const { app } = require('./server')
const { config } = require('./config')

// On port
const port = config.port

app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`)
})
