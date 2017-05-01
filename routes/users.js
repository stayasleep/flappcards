const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');

//temporary, for now leave the db and connections on the same page
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'root',
    database:'c217_fc'
});
connection.connect();


//test login comparison
router.post('/login',function(request,response){
    console.log(request.body);
    let un = request.body.username;
    let upw = request.body.password;
    console.log(un,upw);
    //call db
    connection.query("SELECT `user_pw` FROM `users` WHERE `username`=?",[un],function(err,result){
        if (err) throw err;
        console.log(result);
        let str=JSON.stringify(result);
        let strJ=JSON.parse(str);
        let checkMate = strJ[0].user_pw;
        console.log('password db', checkMate);
        if(checkMate === upw){
            console.log('the passwords match');
            connection.query("SELECT stacks.subject, stacks.category, stacks.last_played, stacks.rating, users.username from stacks JOIN users on stacks.user_id = users.user_id WHERE users.username = ? ORDER BY stacks.last_played DESC LIMIT 1",[un],(err,results)=>{
                if (err) throw err;
                //console log to see if the metadata from your account is retrieved before redirect
                console.log('my results',results);
            } );
            connection.query("SELECT stacks.subject, stacks.category, stacks.created, stacks.rating, users.username FROM stacks JOIN users ON stacks.user_id = users.user_id WHERE NOT users.username = ? ORDER BY stacks.last_played DESC LIMIT 2",[un],(err,results)=>{
                if (err) throw err;
                //console log to see if the metadata from the community is retrieved before redirect
                console.log('comm results',results);
            });
            // response.redirect('/home');
        }else{
            response.statusCode = 404;
            response.write("404 Sorry Not Found");
            response.end();
        }
    })
});
//
//Register
router.post('/register',(request,response,next)=>{
    //get information from registration page
    let newUser = {
        fullname: request.body.name,
        username: request.body.userName,
        user_pw: request.body.password,
        user_email:request.body.email,
        user_bday: request.body.birthday,
    };
    //make call to send info to db
    connection.query("INSERT INTO `users` SET ?", newUser, (err, results)=>{
        if(err) throw err;
        console.log('ID of the inserted user row', results.insertId);
        response.JSON({success: true, msg: "User Registered"});
    })
});
//Authenticate
router.post('/authenticate',(request,response,next)=>{
    response.send('AUTHENTICATE');
});
//Profile
router.get('/profile',(request,response,next)=>{
    response.send('PROFILE');
});

module.exports = router;