const http = require('http')
const {readFileSync} = require('fs')
const express = require('express')
const session = require('express-session')

const app = express();

//  app.use(session({
//   secret: 'its my secret',
//   cookie: { expires: 15000 },
//   resave: true,
//   saveUninitialized: false
// }))

app.use(express.static('../Public'));
app.use(express.urlencoded({
  extended: false
  }));

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

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});