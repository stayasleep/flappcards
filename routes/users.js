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
//clicking myShelf
router.get('/myshelf/:id',(request,response)=>{
    console.log('id of logged on user is: ',request.params.id);
    let uid = request.params.id;
    connection.query("SELECT s.subject as Subject, s.category as Category, s.created as Created, s.rating as Rating, u.username as User, COUNT(*) as Total FROM stacks s INNER JOIN cards c ON s.stack_id=c.stack_id INNER JOIN users u ON s.user_id=u.user_id WHERE u.user_id = ? GROUP BY c.stack_id ORDER BY s.subject",[uid],(err,results)=>{
    // connection.query("SELECT stacks.subject, stacks.category, stacks.created, stacks.rating, users.username FROM stacks JOIN users on stacks.user_id = users.user_id WHERE users.user_id = ?",[uid],(err,results)=>{
        if (err) console.log(err);
        //console log overview of logged-on user's acct...but they only show the username of the logged on user. not the source of stack creation.
        console.log('shelf overview',results);
        response.json({success:true, msg: "User Shelf Retrieved"});
    });
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
//delete overall stack from account
// router.delete('/stack')



//delete an individual card from your stack overview
router.delete('/stack/:id',(request,response)=>{
    let singleID = request.params.id;
    console.log('single id coming from card',singleID);
    connection.query("DELETE FROM `cards` WHERE card_id=?",[singleID],(err,result)=>{
        if (err) throw err;
        response.json({success:true, msg:"Single Card deleted"});
        console.log('rows deleted: ', result.affectedRows);
    });
});
//update an individual card from your stack overview
router.put('/stack/:id',(request,response)=>{
    let singleID = request.params.id;
    //get changed information
    let newQ = request.body.cardQuestion;
    let newA = request.body.cardAnswer;
    connection.query("UPDATE `cards` SET `question`=? , `answer`=? WHERE `card_id`=?",[newQ, newA, singleID],(err,results)=>{
        if (err) throw err;
        console.log('updated',results.affectedRows);
        response.json({success:true, msg: "Single Card Updated"});
    });
});




//Future Considerations below...Authentication will likely handle the login check and provide a token
//Authenticate
router.post('/authenticate',(request,response,next)=>{
    response.send('AUTHENTICATE');
});
//Profile
router.get('/profile',(request,response,next)=>{
    response.send('PROFILE');
});

module.exports = router;