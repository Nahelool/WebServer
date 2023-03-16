
var express = require('express')

var app = express()
var http = require('http')
http.createServer(app)
var io = require('socket.io')(http)
var fs = require('fs')
const { Socket } = require('socket.io-client')
const { response } = require('express')
const { url } = require('inspector')


var clientResponseRef
app.use(express.static('../Public'))

app.get('/*', (req, res) => {
  console.log("Established connection")
  // req = Request , res = Response
  // var pathName = url.parse(req.url).pathName
  // //Gets the asked path of file to fetch
  // var obj ={
  //   pathname : pathname,
  //   method: "get",
  //   params: req.query
  // }
  // io.emit("page-request", obj)
  // clientResponseRef = res

  res.writeHead(200,{'Content-Type':"text/html"})
  html = fs.readFileSync("../Public/HTML/index.html")
  // html2 = fs.readFileSync("multipart/form-data"; boundary=something)
  // res.write(html2)
  res.end(html)


})


// app.post('/*', (req, res) => {
//   // req = Request , res = Response
//   var pathName = url.parse(req.url).pathName
//   //Gets the asked path of file to fetch
//   var obj ={
//     pathname : pathname,
//     method: "post",
//     params: req.body
//   }
//   io.emit("page-request", obj)
//   clientResponseRef = res
// })

// io.on('connection', (socket) =>{
//   console.log('A node connected')
//   socket.on('page-response', (response)=>{
//     clientResponseRef.send(response)
//   })
// })

var serverPort = process.env.YOUR_PORT || process.env.PORT || 3000

app.listen(serverPort, () => {
  console.log(`Example app listening on port ${serverPort}`)
})
