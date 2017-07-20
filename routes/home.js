const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)
const fs = require('fs');
const avatarDictionary = require('./avatar_dictionary');

// Recent stacks query; This gets called for the home page.
router.post('/', (request,response,next)=> {
    console.log('is this the req',request.body.token);
    let un = request.decoded.UserName;
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
        connection.query("SELECT stacks.stack_id, stacks.subject, stacks.rating as 'stackRating', stacks.category, stacks.last_played as 'lastPlayed', DATE_FORMAT(stacks.created,'%Y/%m/%d %H:%i') as 'createdOn', stacks.rating, cards.orig_source_stack AS 'createdBy', users.avatar as 'avatar', COUNT(*) as 'totalCards'" +
            "FROM stacks join cards ON stacks.stack_id=cards.stack_id " +
            "JOIN users ON stacks.user_id = users.user_id WHERE users.username =? GROUP BY stacks.stack_id DESC LIMIT 2 ", [un], (error, results) => {
            if (error) {
                response.send({success: false, message: "There was a problem with your request"});
            } else if (results.length > 0) {

                for (let i = 0; i < results.length; i++) {
                    let userAvatarKey = results[i].avatar; // grab the value to use for the dictionary
                    let userAvatar = path.resolve(avatarDictionary[userAvatarKey]); // Pick off the file path from the dictionary and resolve
                    results[i].avatar = fs.readFileSync(userAvatar, 'base64'); // Synchronous readFile as it does not send too soon. Base64 encoded for minimum processing
                }
                response.send(results);
            } else {
                response.send("Looks like your shelf is empty. Create a stack or take a look at some of the community content below!");
            }
        });
        connection.release();
    })
});
module.exports = router;
