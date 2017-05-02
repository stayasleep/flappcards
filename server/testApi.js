const express = require('express');
const app = express();
const router = express.Router();
const PORT = 8081;  // Run on port 8081
const path = require('path');
const morgan = require('morgan');
const CORS = require('cors'); // For first principles, we'll allows CORS
const bodyParser = require('body-parser');


const users = require('./user_data');
// grab the test users from our test data; it's an object with keys of username.
// A property of a user is userName: "bleepBloop" which will be used later to check if the user can login
// userName: "kchalm", user_pw: "Password2"
app.use(bodyParser.json()); // Parse body of requests as JSON
app.use(bodyParser.urlencoded({extended:false}));


app.use(CORS()); // Invoke the CORS method to test requests fronm the app

app.get('/', function (req, res) {
    res.send("Response to axios GET request");
});

app.post('/', function (req, res) {
    // console.log("POST method request", req);
    // Request body accessible through bodyParserPaP{
    let sentUsername = req.body.userName;
    let sentPassword = req.body.password;
    if (users[sentUsername] === undefined) {
        return res.send(false);
    } else {
        //TODO better error handling than just returning false if undefined
        if (sentPassword === users[sentUsername].user_pw) {
            return res.send(true);
        } else {
            return res.send(false);
        }
    }

});

app.listen(PORT,console.log(`Listening on port ${PORT}`));
