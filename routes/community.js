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
//COMMUNITY
router.post('/', (request,response,next) => {
    // Query the database for all card stacks that do not belong to the user
    let uid = request.decoded.UserID;
    pool.getConnection((error,connection)=>{
        if(error){
            console.log("Error connecting to db",error);
            return response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(error);
        }
        connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, DATE_FORMAT(stacks.created,'%Y/%m/%d %H:%i') as 'createdOn', stacks.rating as 'stackRating', cards.orig_source_stack AS 'createdBy', users.avatar as 'avatar', COUNT(*) as 'totalCards' FROM stacks JOIN cards on stacks.stack_id=cards.stack_id JOIN users ON stacks.user_id = users.user_id WHERE NOT users.user_id = ? GROUP BY cards.stack_id ORDER BY RAND() LIMIT 3",[uid],(error,results)=>{
            if (error) {
                console.log('err with comm req');
                response.send({success: false, message:"There was a problem with your request"});
            }
            else if (results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                    let userAvatarKey = results[i].avatar; // grab the value to use for the dictionary
                    let userAvatar = path.resolve(avatarDictionary[userAvatarKey]); // Pick off the file path from the dictionary and resolve
                    results[i].avatar = fs.readFileSync(userAvatar, 'base64'); // Synchronous readFile as it does not send too soon. Base64 encoded for minimum processing
                }
                console.log('got u results');
                response.send(results);
            }
            else {
                console.log('loadup none found');
                response.send("No community stacks found");
            }
        });
        connection.release();
    })
});

//open for suggestions here
router.post('/featured',(req,res,next)=>{
    let uid = req.decoded.UserID;
    let un = "FlappCards";
    pool.getConnection((error,connection)=>{
        if(error){
            return res.json({
                success: false,
                message:"Problem connecting to DB"
            });
        }
        connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, DATE_FORMAT(stacks.created,'%Y/%m/%d %H:%i') as 'createdOn', stacks.rating as 'stackRating', cards.orig_source_stack AS 'createdBy', users.avatar as 'avatar', COUNT(*) as 'totalCards' FROM stacks JOIN cards on stacks.stack_id=cards.stack_id JOIN users ON stacks.user_id = users.user_id WHERE users.username = ? GROUP BY cards.stack_id;",[un],(error,results)=>{
            if(error){
                res.json({success:false, message:"There was a problem with your request"});
            }else if(results.length>0){
                for(let i=0;i<results.length;i++){
                    let userAvatarKey = results[i].avatar;
                    let userAvatar = path.resolve(avatarDictionary[userAvatarKey]);
                    results[i].avatar=fs.readFileSync(userAvatar,"base64");
                }
                res.send(results);
            }else{
                res.json({
                    success:false,
                    message:"No featured stacks found"
                })
            }
        });
        connection.release();
    })
});
module.exports = router;
