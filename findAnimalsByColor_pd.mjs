import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import Functions from './database.mjs'; 

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

// Route to handle POST request for finding animals by color
app.post('/dogsByColor', async (req, res) => {
  try {
    // Extract the color from the request body
    const { color } = req.body;

    // Call the database function to find animals by color
    const animals = await Functions.findAnimalsByColor(color);

    // Respond with the output of the function
    res.json(animals);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});