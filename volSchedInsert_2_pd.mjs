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
      // Extract the array of schedules from the request body
      const schedules = req.body;
  
      // Validate that schedules is an array
      if (!Array.isArray(schedules)) {
        return res.status(400).send('Request body must be an array of schedules.');
      }
  
      // Loop through each schedule and insert it into the database
      for (const schedule of schedules) {
        // Extract id and time from the schedule
        const { id, time } = schedule;
  
        // Call the database function to insert schedule
        await Functions.SchedInsert(id, time);
      }
  
      // Send a message to the client indicating successful insertion
      res.status(200).send('All schedules inserted successfully.');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });