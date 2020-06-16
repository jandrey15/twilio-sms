const socketIO = require('socket.io')

let socket

const connection = (server) => {
  const io = socketIO.listen(server)

  io.on('connection', (newSocket) => {
    console.log(newSocket.id)
    socket = io.sockets
    // console.log(socket)
  })
}

const getSocket = () => socket

module.exports = { connection, getSocket }
