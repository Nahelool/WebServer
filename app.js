
const express = require('express')
const app = express()
var fs = require('fs')

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// var server = http.createServer((req, res) => {
//     fs.readFile('HTML/index.html', function(error,data){
//         if (error){
//             res.writeHead(404)
//             res.write('Error : File Not Found')
//         } else {
//             res.writeHead(200, { 'Content-Type': 'text/html'})
//             res.write(data)
//         }
//         fs.readFile('HTML/stniggere.css', function(error,style){
//             if (error){
//                 res.writeHead(404)
//                 res.write('Error : File Not Found')
//             } else {
//                 res.writeHead(200, { 'Content-Type': 'text/css'})
//                 console.log("Hello")
//                 res.write(style)
//             }
//         })  
//     res.end()
//     })
// });

// server.listen(port, function(error){
//     if (error){
//         console.log("Something went wrong", error)
//     } else {
//         console.log("Server is listening at port " + port)
//         console.log("567")
//     }
// })
