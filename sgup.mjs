import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mysql from 'mysql'; // Import mysql library
import Functions from './database.mjs'; // Import your database function
import {readFileSync} from 'fs' 

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'database_shvavhav'
});

// Route to handle sign-up requests
app.post('/signup', async (req, res) => {
  try {
    // Extract user details from the request body
    const { name, age, id, phone, pass } = req.body;

    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting MySQL connection:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Call the database function to sign up the user
      Functions.VolSignup(name, age, id, phone, pass)
        .then(() => {
          // Release the connection back to the pool
          connection.release();

          // Respond with a 200 status code indicating successful signup
          res.sendStatus(200);
        })
        .catch(error => {
          console.error('Error executing database function:', error);
          res.status(500).json({ error: 'Internal server error' });

          // Release the connection back to the pool
          connection.release();
        });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
