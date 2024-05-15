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

// Route to handle POST request for inserting schedule
app.post('/volSchedInsert', async (req, res) => {
  try {
    // Extract id and time from the request body
    const { id, time } = req.body;

    // Call the database function to insert schedule
    await Functions.SchedInsert(id, time);

    // Send a message to the client indicating successful insertion
    res.status(200).send('Schedule inserted successfully.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
