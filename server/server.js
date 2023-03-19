var express = require('express')
var app = express()
var http = require('http')
http.createServer(app)
// var io = require('socket.io')(http)
var fs = require('fs')
var url = require('url')

// const { Socket } = require('socket.io-client')
// const { response } = require('express')
// const { url } = require('inspector')
// const { send } = require('process')

// var clientResponseRef

app.use(express.static('../Public'))

notFound = fs.readFileSync("../Public/HTML/404.html")
index = fs.readFileSync("../Public/HTML/index.html")

app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type':'text/html'})
  res.write(index)
  res.end()
})


app.get('/*', (req, res) => {
  fs.readFile('../Public/HTML'+req.url+'.html', function(error,data){
    if(error){
        res.writeHead(404, {'Content-Type':'text/html'})
        res.write(notFound)
    } else {
      res.writeHead(200, {'Content-Type':'text/html'})
      res.write(data)
    }
    res.end()
  })
})

var serverPort = process.env.YOUR_PORT || process.env.PORT || 3000

app.listen(serverPort, () => {
  console.log(`Example app listening on port ${serverPort}`)
})
