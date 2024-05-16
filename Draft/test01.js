const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Example route to handle GET requests
app.get('/getResponse', (req, res) => {
    // Get the value of the "choice" parameter from the query string
    const choice = req.query.choice;

    // Respond based on the value of the "choice" parameter
    if (choice === 'a') {
        res.send('Football');
    } else if (choice === 'b') {
        res.send('Yahel Mehuar');
    } else {
        res.status(400).send('Invalid choice parameter');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
