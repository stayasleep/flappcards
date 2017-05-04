const express = require('express');
const app = express();
const PORT = 8081;  // Run on port 8081

const morgan = require('morgan');
const CORS = require('cors'); // For first principles, we'll allows CORS
const bodyParser = require('body-parser');

const test = require('./routes/test'); // Contains routing for the testApi

const stackoverview=require('./stackoverviewMarket');
const stack2 = require('./stackoverviewCB');

const profile = require('./profile');
const studyMarket = require('./studyMode');
const studyCB = require('./studyMode2');


app.use(bodyParser.json()); // Parse body of requests as JSON
app.use(bodyParser.urlencoded({extended:false}));


app.use(CORS()); // Invoke the CORS method to test requests fronm the app

app.use('/test',test); // Test

app.listen(PORT,console.log(`Listening on port ${PORT}`));
