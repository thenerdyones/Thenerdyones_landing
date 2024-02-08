const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL parameters
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'null',
    database: 'test'
});

// Connect to the database
db.connect((err) => {
    if (err) { throw err; }
    console.log('Connected to the database');
});

// Endpoint to handle the form submission
app.post('/submit-form', (req, res) => {
    const fullName = req.body.fullName;
    const emailAddress = req.body.emailAddress;
    const phoneNumber = req.body.phoneNumber;
    const companyName = req.body.companyName;
    const companyWebsite = req.body.companyWebsite;
    const industry = req.body.industry;
    const businessType = req.body.businessType;
    const onlinePresenceSection = req.body.onlinePresenceSection;
    

    const query = "INSERT INTO test (full_name, email_address, phone_number, company_name, company_website, industry, business_type, pref_comm_method) VALUES (?, ?, ?, ...)";
    db.query(query, [fullName, emailAddress, phoneNumber, companyName, companyWebsite, industry, businessType, onlinePresenceSection], (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
        res.send('Form submitted successfully!');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// CORS Resource Sharing
const cors = require('cors');
app.use(cors());
