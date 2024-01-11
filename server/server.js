const http = require('http')
const {readFileSync} = require('fs')
const express = require('express')
const app = express();

app.use(express.static('../Public'));
app.use(express.urlencoded({
  extended: false
  }));

const index =  readFileSync('../Public/HTML/index.html')

app.get( '/*',(req,res)=>{
  if (req.url == '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index)
  }
})

app.post('/', function(req,res){
  const userParams = req.body
  console.log("User name is "+ userParams.user)
  console.log("User password is "+userParams.password)
  res.end()
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});