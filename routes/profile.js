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
                let avatarKey = result[0].avatar;
                let avatarPic = fs.readFileSync(path.resolve(avatarDictionary[avatarKey]), 'base64');
                result[0].avatar = avatarPic; // Assign the pic
                response.send(result); // Send the result
            }
        });
        connection.release();
    })
})
    .put("/", (req, res, next) => {
        let userID = req.decoded.UserID;
        let userName= req.decoded.UserName;

        let name = req.body.name;
        let email = req.body.email;
        let bday = req.body.birthday;

        console.log('pro req',req.body);

        pool.getConnection((error, connection) => {
            if(error){
                return res.json({success: false, message: "Error connecting to db"});
            }
            connection.query("UPDATE `users` SET `fullname`= ?, `user_email` = ?, `user_bday` = ? WHERE `user_id` = ? AND `username` = ?;",[name, email, bday, userID, userName], (error, results) =>{
                console.log('res from profile',results);
                if (results.affectedRows === 1){
                    connection.query("SELECT `fullname`, `user_email`, DATE_FORMAT(users.user_bday,'%Y/%m/%d') as `user_bday` FROM `users` where `user_id` = ?;",[userID],(error, results) =>{
                        console.log('new new profile', results);
                        if(error){
                            return res.json({success: false, message: "There was a problem with your request"});
                        }
                        if(results.length !== 0){
                            res.json({success: true, results: results});
                        }else{
                            res.json({success: false, message:"User information not found"});
                        }

                    })
                }else{
                    res.json({success: false, message: "Cannot update user's information"});
                }
            })
        })

});
module.exports = router;
