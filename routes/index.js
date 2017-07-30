const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)
const nodemailer = require('nodemailer');


//route variables
let user = require('./user');
let guest = require('./guest');
let myshelf = require('./myshelf');
let searched = require('./search');
let home = require('./home');
let community = require('./community');
let stackOverview = require('./stackOverview');
let createCards = require('./createCards');
let profile = require('./profile');
let logOut = require('./logOut');
let copy = require('./copy');
let recovery = require('./recovery');
let reset = require('./reset');


//set up non-token based routes
router.use('/',user);
router.use('/guest',guest);
router.use('/recovery',recovery);

//set up one-time token route
router.use('/reset',reset);

//middleware verification for token-based routes
router.use((request, response, next)=> {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
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
        return response.redirect('/404');
    }
});

//set up token-based subroutes

// router.use('/home',home);
router.use('/community',community);
// router.use('/myShelf',myshelf);
router.use('/stackOverview',stackOverview);
// router.use('/createCards',createCards);
router.use('/search', searched);
// router.use('/profile',profile);
// router.use('/logout', logOut);
// router.use('/copy', copy);


//middleware for token based sub routes where authorization is needed
router.use((request,response,next) =>{
    const user = request.decoded.UserName;
    const scope = request.decoded.scope;
    //dont want guest and guest privileges to be allowed to go beyond here
    if(user === "guest" || scope===1000){
        return response.json({
            success:false,
            message:"You need to log in or register before you can continue.",
            guestToken: true
        })
    }
    next();
});

router.use('/home',home);
router.use('/myShelf',myshelf);
router.use('/createCards',createCards);
router.use('/profile',profile);
router.use('/copy',copy);
router.use('/logout',logOut);

module.exports = router;

