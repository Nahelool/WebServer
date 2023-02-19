var http = require('http')
var fs = require('fs')
const port = 3000


var server = http.createServer((req, res) => {
    res.write("dasdasd")
    fs.readFile('indox.html', function(error,data){
        if (error){
            res.writeHead(404)
            res.write('Error : File Not Found')
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html-'})
            res.write(data)
        }
    })
    res.end()
});

server.listen(port, function(error){
    if (error){
        console.log("Something went wrong", error)
    } else {
        console.log("Server is listening at port " + port)
    }
})
