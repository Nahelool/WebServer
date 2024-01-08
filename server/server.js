const http = require('http')
const server = http.createServer( (req,res)=>{
  const notFound = readFileSync('../../Public/HTML/404.html')
  const index =  readFileSync('../../Public/HTML/index.html')
  if (req.url === '/*'){
    res.setHeader('Content-Type', 'text/html', 200);
    res.end(index)
  }
})

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});