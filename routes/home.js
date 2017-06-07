const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)

// Recent stacks query; This gets called for the home page.
router.post('/', (request,response,next)=> {
    let un = request.decoded.UserName;
    let ip = request.ip;
    console.log('my ip',ip);
    console.log('our ips', request.ips);
    console.log('reqcon',request.connection);
    console.log('header', request.headers);
    // Query the database for the user's recent stacks
    pool.getConnection((error, connection) => {
        if (error) {
            console.log("Error connecting to db", error);
            return response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(error);
        }
        connection.query("SELECT stacks.stack_id, stacks.subject, stacks.rating as 'stackRating', stacks.category, stacks.last_played as 'lastPlayed', DATE_FORMAT(stacks.created,'%Y/%m/%d %H:%i') as 'createdOn', stacks.rating, cards.orig_source_stack AS 'createdBy',COUNT(*) as 'totalCards'" +
            "FROM stacks join cards ON stacks.stack_id=cards.stack_id " +
            "JOIN users ON stacks.user_id = users.user_id WHERE users.username =? GROUP BY stacks.stack_id DESC LIMIT 2 ", [un], (error, results) => {
            if (error) {
                response.send({success: false, message: "There was a problem with your request"});
            } else if (results.length > 0) {
                response.send(results);
            } else {
                response.send("Looks like your shelf is empty. Create a stack or take a look at some of the community content below!");
            }
        });
        connection.release();
    })
});
module.exports = router;
