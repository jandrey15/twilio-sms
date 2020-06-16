'use strict'

const { app } = require('./server')
const http = require('http')
const { config } = require('./config')

// On port
const port = config.port

const server = http.createServer(app)

require('./sockets').connection(server)

server.listen(port, () => {
  console.log(`Listening http://localhost:${port}`)
})
