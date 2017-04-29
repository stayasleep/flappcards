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

router.get('/',function(request,response){
    response.sendFile(path.join(__dirname+'/../skeleton_html/login.html'));
});
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
            response.redirect('/../skeleton_html/home.html');
        }else{
            response.statusCode = 404;
            response.write("404 Sorry Not Found");
            response.end();
        }
    })
});

module.exports = router;