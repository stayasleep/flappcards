const express = require('express');
const app = express();
const router = express.Router();
const PORT = 8081;  // Run on port 8081
const path = require('path');
const morgan = require('morgan');
const CORS = require('cors'); // For first principles, we'll allows CORS
const bodyParser = require('body-parser');

const test = require('./routes/test');

const users = require('./user_data');
const dashboard=require('./dashboard');
const stackoverview=require('./stackoverviewMarket');
const stack2 = require('./stackoverviewCB');
const myShelf = require('./myShelf');
const profile = require('./profile');
const studyMarket = require('./studyMode');
const studyCB = require('./studyMode2');
// grab the test users from our test data; it's an object with keys of username.
// A property of a user is userName: "bleepBloop" which will be used later to check if the user can login
// userName: "kchalm", user_pw: "Password2"
app.use(bodyParser.json()); // Parse body of requests as JSON
app.use(bodyParser.urlencoded({extended:false}));


app.use(CORS()); // Invoke the CORS method to test requests fronm the app

app.use('/test',test);

// app.post('/', function (req, res) {
//     // console.log("POST method request", req);
//     // Request body accessible through bodyParserPaP{
//     let sentUsername = req.body.userName;
//     let sentPassword = req.body.password;
//     if (users[sentUsername] === undefined) {
//         return res.send(false);
//     } else {
//         //TODO better error handling than just returning false if undefined
//         if (sentPassword === users[sentUsername].user_pw) {
//             return res.send(true);
//         } else {
//             return res.send(false);
//         }
//     }
//
// });

app.listen(PORT,console.log(`Listening on port ${PORT}`));
