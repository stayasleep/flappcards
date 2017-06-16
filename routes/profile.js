const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)
const fs = require('fs'); // File system
const avatarDictionary = require('./avatar_dictionary');




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
                response.send(result);
            }
        });
        connection.release();
    })
});
module.exports = router;
