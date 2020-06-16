const el = document.getElementById('datenow')
if (el) {
  el.value = Date.now()
}

const socket = io()

socket.on('new message', (data) => {
  console.log(data)
  const messagesList = document.getElementById('messages')

  const li = document.createElement('li')
  li.classList = 'new__item'

  const h1 = document.createElement('h1')
  const body = document.createElement('p')
  body.appendChild(document.createTextNode(data.message))
  h1.appendChild(document.createTextNode(data.phone))

  li.appendChild(h1)
  li.appendChild(body)
  messagesList.prepend(li)
  notifyMe('New message SMS')
})

Notification.requestPermission().then(function (result) {
  console.log(result)
})

function notifyMe(message = 'Hi there!') {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification')
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    var notification = new Notification(message)
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        var notification = new Notification(message)
      }
    })
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}
