const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)

//route variables
let user = require('./user');
let myshelf = require('./myshelf');
let searched = require('./search');
let home = require('./home');
let community = require('./community');
let stackOverview = require('./stackOverview');
let createCards = require('./createCards');
let profile = require('./profile');
let logOut = require('./logOut');

//set up the subroutes for non-token based routes
app.use('/',user);

//middleware for token-based routes
// VERIFY TOKEN
app.use((request, response, next)=> {
    // const token = request.body.token || request.query.token || request.headers['x-access-token'];
    const token = request.body.token;
    // decode token
    if (token) {
        // JWT verify method to check token information and secret
        jwt.verify(token, config.secret,(err, decoded)=> {
            if (err) {
                return response.json({ success: false, message: 'Failed to authenticate.' });
            } else {
                // if token signature was verified, decode the request and use next() to go to the next function
                request.decoded = decoded;
                next();
            }
        });
    } else {
        // If no token was received, send back a 403 error
        return response.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});
//set up token-based subroutes
app.use('/home',home);
app.use('/community',community);
app.use('/myShelf',myshelf);
app.use('/stackOverview',stackOverview);
app.use('/createCards',createCards);
app.use('/search', searched);
app.use('/profile',profile);
app.use('/logout', logOut);
