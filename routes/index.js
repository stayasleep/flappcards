const express = require('express');
const app = express();
const router = express.Router();
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
router.use('/',user);

//middleware for token-based routes
// VERIFY TOKEN
router.use((request, response, next)=> {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    console.log('tok is',token);
    if (token) {
        // JWT verify method to check token information and secret
        jwt.verify(token, config.secret,(err, decoded)=> {
            if (err) {
                return response.json({ success: false, message: 'Failed to authenticate.' });
            } else {
                console.log('token is verified');
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
router.use('/home',home);
router.use('/community',community);
router.use('/myShelf',myshelf);
router.use('/stackOverview',stackOverview);
router.use('/createCards',createCards);
router.use('/search', searched);
router.use('/profile',profile);
router.use('/logout', logOut);

module.exports = router;

