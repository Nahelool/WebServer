import express from "express";
import http from "http";
import bodyParser from "body-parser";
import mysql from "mysql"; // Import mysql library
import Functions from "./database.mjs"; // Import your database function
import { readFileSync } from "fs";

const app = express();
const port = 3000;

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
let dogMatrix = [];
// Route to handle incoming requests
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
app.get("/allTrips", async (req, res) => {
  try {
    // Call the database function to get all trips
    const trips = await Functions.getTodayTrips();

    // Respond with the retrieved trips data as JSON
    res.json(trips);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/*", (req, res) => {
  try {
    if (req.url == "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(index);
    }

    let filePath = "../Public/HTML" + req.url+'.html';
    let reqFile = readFileSync(filePath);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(reqFile);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(notFound);
  }
});

// Route to handle sign-up requests
app.post("/signup", async (req, res) => {
  try {
    // Extract user details from the request body
    const { name, id, phone, age, pass } = req.body;

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
      Functions.VolSignup(name, age, id, phone, pass)
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

app.post("/dogData", async (req, res) => {
  try {
    let wentToTrip = false;
    const now = new Date();
    const dogNum = req.body.idCode % 100;
    //Returns the last 2 digits of the idCode

    dogMatrix.forEach((trip) => {
      if (trip[0] === dogNum) {
        console.log("Trip In Progress Found!");
        wentToTrip = true;
        // Get a connection from the pool
        pool.getConnection((err, connection) => {
          if (err) {
            console.error("Error getting MySQL connection:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
          }
          Functions.TripInsert(null, dogNum, trip[1], now, "Normal").then(
            () => {
              // Release the connection back to the pool
              connection.release();

              // Respond with a 200 status code indicating successful operation
              res.sendStatus(200);
            }
          );
        });
        dogMatrix = dogMatrix.filter(item => item !== trip)
      }
    });
    if (!wentToTrip) {
      console.log("No Trip In Progress Found");
      dogMatrix.push([dogNum, now]);
      res.sendStatus(200);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
