const express = require('express')
const app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

var users = []

// 静态服务器
app.use('/', express.static(__dirname + '/www'))
server.listen(3000)

// socket 是实时RealTime核心
// http协议 是无法长连接的
// 一旦送达 立马断开
// 只能 ajax(长期轮询) 提交 或再提交get/post
// iframe
io.sockets.on('connection', function(socket) {
  socket.on('login', function(nickname) {
    console.log(nickname)
    if(users.indexOf(nickname) > -1) {
      socket.emit('nickExisted')
    } else {
      socket.nickname = nickname
      users.push(nickname)
      socket.emit('loginSuccess')
      io.sockets.emit('system', nickname, users.length)
    }
  })
})
