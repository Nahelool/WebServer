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

// Route to handle GET request for all trips
app.get('/allTrips', async (req, res) => {
  try {
    // Call the database function to get all trips
    const trips = await Functions.getTodayTrips();

    // Respond with the retrieved trips data as JSON
    res.json(trips);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
