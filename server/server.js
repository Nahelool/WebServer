const http = require('http')
const {readFileSync} = require('fs')
const express = require('express')
const app = express();

app.use(express.static('../Public'));
const index =  readFileSync('../Public/HTML/index.html')

app.get( '/*',(req,res)=>{
  if (req.url == '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index)
  }
})

app.post('/*', (req,res)=>{
  console.log("Hello")
  res.end()
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});