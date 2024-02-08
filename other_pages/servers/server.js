const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'localhost', // or your database host
    user: 'root', // or your database username
    password: 'root', // or your database password
    database: 'test' // your database name
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to MySQL database');
});

// Route to handle form submission
app.post('/send', (req, res) => {
    const { name, email, phone, message } = req.body;
    const query = 'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)';

    connection.query(query, [name, email, phone, message], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            res.status(500).send('Server error');
        } else {
            console.log('Inserted data:', results);
            res.send('Form submitted successfully');
        }
    });
});

// Start server
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const cors = require('cors');
app.use(cors());
