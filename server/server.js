
var express = require('express')
var app = express()
var http = require('http')
http.createServer(app)
var io = require('socket.io')(http)
var bodyParser = require('body-parser')
var fs = require('fs')
const { Socket } = require('socket.io-client')
const { response } = require('express')
const { url } = require('inspector')

app.use(bodyParser)

var clientResponseRef

app.get('/*', (req, res) => {
  // req = Request , res = Response
  var pathName = url.parse(req.url).pathName
  //Gets the asked path of file to fetch
  var obj ={
    pathname : pathname,
    method: "get",
    params: req.query
  }
  io.emit("page-request", obj)
  clientResponseRef = res
})

app.post('/*', (req, res) => {
  // req = Request , res = Response
  var pathName = url.parse(req.url).pathName
  //Gets the asked path of file to fetch
  var obj ={
    pathname : pathname,
    method: "post",
    params: req.body
  }
  io.emit("page-request", obj)
  clientResponseRef = res
})

io.on('connection', (socket) =>{
  console.log('A node connected')
  socket.on('page-response', (response)=>{
    clientResponseRef.send(response)
  })
})

var serverPort = process.env.YOUR_PORT || process.env.PORT || 3000

http.listen(serverPort, () => {
  console.log(`Example app listening on port ${serverPort}`)
})

