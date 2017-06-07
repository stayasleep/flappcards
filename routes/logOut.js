const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)

//Log out, pass the token, update the users last_login from table
router.post('/',(request,response,next)=>{
    let un =request.decoded.UserName;
    pool.getConnection((error,connection)=>{
        if(error){
            console.log("Error connecting to db",error);
            response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(error);
        }
        connection.query("UPDATE `users` SET `last_login`=CURRENT_TIMESTAMP WHERE user_id=?",[un],(error,result)=>{
            if (error) {
                response.send({success: false, message:"There was a problem with your request"});
            }else {
                response.send({success:true, message:"updated log out"});
            }
        });
        connection.release();
    })
});
module.exports = router;
