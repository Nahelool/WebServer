import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql'; // Import mysql library
import Functions from './database.mjs'; // Import your database function
import {readFileSync} from 'fs' 

const app = express();
const port = 5000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'database_shvavhav'
});

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Route to handle incoming requests
app.post('/login', async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting MySQL connection:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Call your database function to process the username and password
      Functions.VolLogin(username, password)
        .then(userData => {
          // Release the connection back to the pool
          connection.release();

          // Respond with the retrieved user data as JSON
          res.json(userData);
        })
        .catch(error => {g
          console.error('Error executing database function:', error);
          res.status(500).json({ error: 'Internal server error' });

          // Release the connection back to the pool
          connection.release();
        });
    });
  } catch (error) {
    // Handle any errors that occur during processing
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const index =  readFileSync('../HTML/index.html')
const profile =  readFileSync('../HTML/profile.html')

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

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});