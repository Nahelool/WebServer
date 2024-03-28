import express from 'express';
import Functions from './database.js';
const app = express();
const port = 3000;
// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse incoming URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Example route to handle POST requests
app.post('/api/data', (req, res) => {
    // Handle the incoming data from the client
    const data = req.body;

    // Print the received data to the console in the desired format
    console.log(`Received data: { '${data.word}' }`);

    // Process the data (you can save it to the database, perform some logic, etc.)
    // For now, let's just send a response back to the client
    res.json({ message: 'Data received successfully!', data });
});

// Example route to handle GET requests
app.get('/getFortnitePage', (req, res) => {
    // Build an HTML page dynamically and send it as a response
    const htmlPage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Fortnite Page</title>
        </head>
        <body>
            <h1>Welcome to the Fortnite Page!</h1>
            <p>This page is served dynamically by the server.</p>
            <p>Here's the word ${Functions.AnimInfo(5)}: Fortnite</p>
        </body>
        </html>
    `;

    res.send(htmlPage);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});