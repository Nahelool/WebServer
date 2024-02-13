// Import required modules
import express from 'express';
import Functions from './database.js';
// Create an Express app
const app = express();
const port = 3000;

// Define a route handler for the GET request
app.get('/animals', async (req, res) => {
  const Animal_ID = req.query.Animal_ID; // Assuming color is sent as a query parameter

  try {
    // Call the asynchronous function to get animal IDs by color
    const animal_info = await Functions.AnimInfo(Animal_ID);
    
    // Send the response with the retrieved animal IDs array as JSON
    res.json({ animal_info });
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/trips', async (req, res) => {
  const Color = req.query.Color; // Assuming color is sent as a query parameter

  try {
    // Call the asynchronous function to get animal IDs by color
    const animalids = await Functions.findAnimalsByColor(Color);
    const trips= await Functions.leastrecent();
    const filteredArray = await trips.filter(element => animalids.includes(element));
    // Send the response with the retrieved animal IDs array as JSON
    
    res.json({ filteredArray });
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});