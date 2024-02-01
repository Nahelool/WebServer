const http = require('http')
const {readFileSync} = require('fs')
const express = require('express')
const bodyParser = require('body-parser');
const app = express();


app.use(express.static('../Public'));
app.use(express.urlencoded({
  extended: false
  }));
app.use(bodyParser.json());

const index =  readFileSync('../Public/HTML/index.html')
const profile =  readFileSync('../Public/HTML/profile.html')


app.get( '/*',(req,res)=>{
  if (req.url == '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index)
  }
  if (req.url == '/profile'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(profile)
  }
})

app.post('/', function(req,res){
  const userParams = req.body
  console.log("User name is "+ userParams.user)
  console.log("User password is "+userParams.password)
  res.json(userParams)
})

app.post('/dogData', (req, res) => {
  console.log('Received data from ESP32:', req.body);
  res.send('Data received successfully!');
});
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});