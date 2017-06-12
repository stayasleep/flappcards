const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)
const fs = require('fs'); // File system
// const avatars = express.use('/avatars', express.static(path.join(__dirname,'routes'))); // expose avatars folder;
// console.log("avatars?", avatars);




//Profile retrieve some user information
router.post('/',(request,response, next)=>{
    let un = request.decoded.UserID;

    pool.getConnection((error,connection)=>{
        if(error){
            console.log("Error connecting to db",error);
            response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(error);
        }
        connection.query("SELECT users.fullname, users.username, users.avatar, DATE_FORMAT(users.user_bday, '%Y/%m/%d') as 'user_bday', users.user_email, DATE_FORMAT(users.user_join, '%Y/%m/%d') as 'user_join' FROM users WHERE users.user_id =?",[un],(error,result)=>{
            if (error) {
                response.send({success: false, message:"There was a problem with your request"});
            } else {
                const avatarDictionary = {
                    "0": './routes/avatars/green.jpg',
                    "1": './avatars/purple.jpg',
                    "2": './avatars/red.jpg'
                };

                let userAvatarKey = result[0].avatar; // grab the value to use for the dictionary
                let userAvatar = path.resolve(avatarDictionary[userAvatarKey]); // Pick off the file path from the dictionary and resolve
                result[0].avatar = fs.readFileSync(userAvatar, 'base64'); // Synchronous readFile as it does not send to
                console.log("After result[0].avatar = fs.readFileSync", result[0].avatar);
                response.send(result);
            }
        });
        connection.release();
    })
});
module.exports = router;
