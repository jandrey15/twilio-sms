const timeago = require('timeago.js')

function timeAgo(date) {
  return timeago.format(date)
}

module.exports = timeAgo
