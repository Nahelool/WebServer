import express from "express";
import http from "http";
import bodyParser from "body-parser";
import mysql from "mysql"; // Import mysql library
import Functions from "./database.mjs"; // Import your database function
import { readFileSync } from "fs";

const app = express();
const port = 5000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "database_shvavhav",
});

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

//Automatic send neccesarry files
app.use(express.static("../Public"));
app.use(
  express.urlencoded({
    extended: false,
  })
);

let index = readFileSync("../Public/HTML/index.html");
let notFound = readFileSync("../Public/HTML/404.html");

app.get("/pages/*", (req, res) => {
  try {
    if (req.url == "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(index);
    }
    let filePath = "../Public/HTML" + req.url.substring(6)+'.html';
    let reqFile = readFileSync(filePath);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(reqFile);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(notFound);
  }
});

app.get("/", (req,res)=>{
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(index);
})

// Route to handle incoming login requests
app.post("/login", async (req, res) => {
  try {
    // Extract username and password from the request body
    const Id = req.body.user;
    const password = req.body.password;
    const username = parseInt(Id);
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting MySQL connection:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      // Call your database function to process the username and password
      Functions.VolLogin(username, password)
        .then((login) => {
          if (login) {
            Functions.VolInfo(username).then((userData) => {
              // Release the connection back to the pool
              connection.release();
              // Respond with the retrieved user data as JSON
              res.status(200).json(userData);
            });
          } else {
            res.status(400).json({ error: "Incorret Information" });
          }
        })
        .catch((error) => {
          console.error("Error executing database function:", error);
          res.status(500).json({ error: "Internal server error" });

          // Release the connection back to the pool
          connection.release();
        });
    });
  } catch (error) {
    // Handle any errors that occur during processing
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to handle GET request for all trips
app.get("/allTrips", async (req, res)  => {
  try {
    // Call the database function to get all trips
    const trips = await Functions.getTodaysTrips();

    // Respond with the retrieved trips data as JSON
    res.json(trips);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to handle sign-up requests
app.post("/signup", async (req, res) => {
  try {
    // Extract user details from the request body
    const { id, name, phone, age, password } = req.body;
    console.log(phone)

    console.log(
      "Data Arrived! Volunteers Name is " + name + " and age is " + age
    );
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting MySQL connection:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      // Call the database function to sign up the user
      Functions.VolSignup(id, name, age, phone, password)
        .then(() => {
          // Release the connection back to the pool
          connection.release();

          // Respond with a 200 status code indicating successful signup
          res.sendStatus(200);
        })
        .catch((error) => {
          console.error("Error executing database function:", error);
          res.status(500).json({ error: "Internal server error" });

          // Release the connection back to the pool
          connection.release();
        });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to handle POST request for inserting schedule
app.post('/volSchedInsert', async (req, res) => {
  try {
    // Extract the array of schedules from the request 
    const schedules = req.body;
    console.log(schedules)

    // Validate that schedules is an array
    if (!Array.isArray(schedules)) {
      return res.status(400).send('Request body must be an array of schedules.');
    }

    // Loop through each schedule and insert it into the database
    for (const schedule of schedules) {
      // Extract id and time from the schedule
      const scheduleParse = JSON.parse(schedule)
      const {id, time} = scheduleParse;

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

// Route to handle GET request for week schedule
app.get('/weekSched', async (req, res) => {
  try {
    // Call the database function to get week schedule
    const weekSchedule = await Functions.getSchedule('week');

    // Respond with the week schedule array
    res.send(weekSchedule);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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

// Route to handle POST request for retrieving animal info by ID
app.post('/dogInfo', async (req, res) => {
  try {
    // Extract the animal ID from the request body
    const { id }  = req.body;

    // Call the database function to retrieve animal info by ID
    const animalInfo = await Functions.AnimInfo(id);

    // Respond with the output of the function
    res.json(animalInfo);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle POST request to insert or update a dogs trip
app.post('/dogData', async (req, res) => {
  try {
    // Extract the animal ID from the request body
    const idCode = req.body.idCode;
    const id = (parseInt(idCode))%100
    // Respond with the output of the function
    res.send(200);

    // // Call the database function to insert a dogs trip
    Functions.updateOrInsertTrip(215575234,id,'Normal');

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
