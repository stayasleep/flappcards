const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)
const avatars = require('./avatars');


//Register, token is sent and when return from server...it should include the user_id # inside and the username
router.post('/register',(request,response,next)=>{
    let newUser = {
        fullname: request.body.name,
        username: request.body.username,
        user_pw: request.body.password,
        user_email:request.body.email,
        user_bday: request.body.birthday,
        avatar: Math.floor(Math.random()*10)
    };
    if(Object.keys(request.body).length===0){
        return response.json({success:false, error:"Invalid Submission"})
    }
    if(newUser.username && !/^[a-zA-Z0-9]{6,20}/i.test(newUser.username)){
        return response.json({success: false, error: "Registration failed"})
    }
    if(newUser.userName && !/^\w+/i.test(newUser.userName)){
        return response.json({success: false, error: "Registration failed"})
    }
    if (newUser.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(newUser.email)) {
        return response.json({success: false, error: "Registration failed"})
    }
    if (newUser.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/i.test(newUser.password)) {
        return response.json({success: false, error: "Registration failed"})
    }
    if (newUser.birthday && !/([12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))/i.test(newUser.birthday)){
        return response.json({success: false, error: "Registration failed"})
    }
    pool.getConnection((err,connection)=>{
        if(err){
            console.log("Error connecting to db",err);
            return response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(err);
        }
        connection.query("SELECT EXISTS(SELECT 1 FROM users WHERE username=?) as 'taken'",[newUser.username],(err,result)=> {
            //if result = 1 UN already exits, if 0 then username does not exists
            if (err) {
                response.send("Error handling request");
                console.log("Error handling request",err);
            }
            if (result[0].taken === 1) { //UN exists
                // use return statement to jump out of the function to avoid setting headers after they've been sent
                // If the username is taken, send back userNameTaken: true; Now, would be a good time to consider status codes.
                return response.json({success: false, usernameTaken: true});
            }
            // Use bcrypt to salt and hash the password.
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.user_pw, salt, function (err, hash) {
                    newUser.user_pw = hash;
                    connection.query("INSERT INTO `users` SET ?", newUser, (err, results) => {
                        // Use JSON Web Token to issue and sign the user a token
                        // Set token to expire in 1 week for persistent login
                        let token = jwt.sign({UserName: newUser.username, UserID: results.insertId, scope:1110 }, config.secret, {
                            expiresIn: 604800 //1 week in seconds
                        });
                        response.json({
                            success: true,
                            message: "User registered",
                            token: token
                        });
                    })
                });
            });
        });
        connection.release();
    })
});
//test login comparison
router.post('/login',function(request,response,next){
    if(Object.keys(request.body).length===0){
        return response.json({success:false, msg: "Invalid Submission"})
    }
    if(!request.body.username || !request.body.password){
        return response.json({success:false, msg:"invalid Submission Type"})
    }
    let usn = request.body.username;
    let upw = request.body.password;
    //Query database to see if user exists in database
    pool.getConnection((error,connection)=>{
        if(error){
            console.log("Error connecting to db",error);
            return response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
        }
        connection.query("SELECT `username`,`user_id`, `user_pw` FROM `users` WHERE `username`=?",[usn],function(error,result) {
            if (error) {
                response.json({success: false, msg: "Username/Password not found"});
            }
            else if (result.length > 0) {
                let un = result[0].username;
                let hash = result[0].user_pw;
                let usersid = result[0].user_id;
                bcrypt.compare(upw, hash, function (error, res) {
                    // If the user password matches, issue and sign the token
                    if (res){
                        let token = jwt.sign({UserName: un,UserID: usersid, scope:1110 },config.secret,{
                            expiresIn: 604800 //1 week in seconds
                        });
                        response.json({
                            success: true,
                            token: token
                        });
                    } else {
                        response.json({success: false, msg: "Username/Password does not match"});
                    }
                });
            }
            else {
                response.json({success: false, msg: "Username/Password not found "});  //blank un and pw return this
            }
        });
        connection.release();
    });
});

router.get('/avatars/:avatarImage', avatars); // for serving the url. Front end makes a request to this URL


module.exports = router;

//the code here will be modified in the future ... right now we will hard code scope and then we will grab it from the db