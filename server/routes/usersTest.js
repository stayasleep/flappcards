const express = require('express');
const router = express.Router();
const connection = require('../config/config'); // So connection credentials can be ignored
const config = require('../config/secret'); //keep the secret in a sep. directory[[maybe can do in confic js]]
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// route to authenticate a user (POST http://localhost:8080/api/authenticate)

// route middleware to verify a token
router.use((request, response, next)=> {
    // check header or url parameters or post parameters for token
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret,(err, decoded)=> {
            if (err) {
                return response.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                request.decoded = decoded;
                //response wil be sent by the next function...
                next();
            }
        });
    } else {
        // if there is no token
        return response.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

// route to show a random message (GET http://localhost:8080/api/)

// route to return all users (GET http://localhost:8080/api/users)

// apply the routes to our application with the prefix /api
