const express = require('express');
const app = express();
const PORT = 8081;  // Run on port 8081
const path = require('path');
const morgan = require('morgan');
const CORS = require('cors'); // For first principles, we'll allows CORS
app.use(CORS()); // Invoke the CORS method to test requests fronm the app

app.get('/', function (req, res) {
    res.send('Test');
});

app.post('/', function (req, res) {
   console.log("POST method request", req);
   console.log("req.")
});

app.listen(PORT,console.log(`Listening on port ${PORT}`));
