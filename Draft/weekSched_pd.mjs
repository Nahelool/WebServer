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

// Route to handle GET request for week schedule
app.get('/weekSched', async (req, res) => {
  try {
    // Call the database function to get week schedule
    const weekSchedule = await Functions.getSchedule('Week');

    // Respond with the week schedule array
    res.send(weekSchedule);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
