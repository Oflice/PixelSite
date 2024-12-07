const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Parse JSON bodies
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to save artwork
app.post('/save-artwork', (req, res) => {
    const artworkData = req.body.artwork;
    const filePath = path.join(__dirname, 'data', 'artwork.json');

    // Save artwork data to a file (can be replaced with a database)
    fs.writeFile(filePath, artworkData, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save artwork' });
        }
        res.json({ message: 'Artwork saved successfully' });
    });
});

// Endpoint to load artwork
app.get('/load-artwork', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'artwork.json');

    // Read artwork data from the file (can be replaced with a database)
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to load artwork' });
        }
        res.json({ artwork: data });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
