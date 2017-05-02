const express = require('express');
const app = express();
const router = express.Router();
const PORT = 8081;  // Run on port 8081
const path = require('path');
const morgan = require('morgan');
const CORS = require('cors'); // For first principles, we'll allows CORS
const bodyParser = require('body-parser');


app.use(bodyParser.json()); // Parse body of requests as JSON
app.use(bodyParser.urlencoded({extended:false}));


app.use(CORS()); // Invoke the CORS method to test requests fronm the app

app.get('/', function (req, res) {
    res.send("Response to axios GET request");
});

app.post('/', function (req, res) {
   // console.log("POST method request", req);
   console.log("req.body", req.body);
   console.log("req.body.userName", req.body.userName);
   console.log("req.body.password", req.body.password);
    let username = req.body.userName;
    let pass = req.body.password;


    res.send(true); // Green lighting the request.
});

app.listen(PORT,console.log(`Listening on port ${PORT}`));
