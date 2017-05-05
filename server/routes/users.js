const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const connection = require('../config');
//temporary, for now leave the db and connections on the same page

connection.connect((error) => {
    (error) ? (console.error('error connection: ' + error.stack)) : '';
    return;
});


//test login comparison
router.post('/login',function(request,response){
    console.log(request.body);
    let un = request.body.userName;
    let upw = request.body.password;
    //call db
    connection.query("SELECT `user_pw` FROM `users` WHERE `username`=?",[un],function(err,result){
        if (err) throw err;
        let str=JSON.stringify(result);
        let strJ=JSON.parse(str);
        let checkMate = strJ[0].user_pw;
        if(checkMate === upw){
            response.send(true);
        }else{
            // response.statusCode = 404;
            // response.write("404 Sorry Not Found");
            response.end();
        }
    })
});

router.post('/home', (request,response)=> {

    let un = request.body.userName; // had to intentionally send a kchalm username. In the process of upgrading to tokens

    connection.query("SELECT stacks.subject, stacks.category, stacks.last_played, stacks.rating, users.username from stacks JOIN users on stacks.user_id = users.user_id WHERE users.username = ? ORDER BY stacks.last_played DESC LIMIT 1",[un],(err,results)=>{
            if (err) throw err;
            //console log to see if the metadata from your account is retrieved before redirect
            response.send(results);
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
router.delete('/stack/:cId',(request,response)=>{
    let singleID = request.params.cId;
    console.log('single id coming from card',singleID);
    connection.query("DELETE FROM `cards` WHERE card_id=?",[singleID],(err,result)=>{
        if (err) throw err;
        response.json({success:true, msg:"Single Card deleted"});
        console.log('rows deleted: ', result.affectedRows);
    });
});
//update an individual card from your stack overview
router.put('/stack/:cId',(request,response)=>{
    let singleID = request.params.cId;
    //get changed information
    let newQ = request.body.cardQuestion;
    let newA = request.body.cardAnswer;
    connection.query("UPDATE `cards` SET `question`=? , `answer`=? WHERE `card_id`=?",[newQ, newA, singleID],(err,results)=>{
        if (err) throw err;
        console.log('updated',results.affectedRows);
        response.json({success:true, msg: "Single Card Updated"});
    });
});
//create stack by clicking any create button, [userID is from logged in user and so is
router.post('/stack/:user_id',(request,response)=>{
    let userID = request.params.user_id;
    let newSub = request.body.subject;
    let newCat = request.body.category;
    let newQ = request.body.question;
    let newA = request.body.answer;
    //get username of logged in user
    let whoMadeMe = "user1";

    connection.query(
        "BEGIN; " +
        "INSERT INTO stacks(user_id, subject, category) VALUES (?,?,?); "+
        "INSERT INTO cards(stack_id, question, answer, orig_source_stack) VALUES (LAST_INSERT_ID(),?,?,?); "+
        "COMMIT;",[userID,newSub,newCat,newQ,newA,whoMadeMe],(err,results)=>{
        if(err) throw err;
        console.log(userID+" Made A Stack w 1 q and a");
        response.json({success:true, msg:"Stack was just created"});
    });
    // connection.query("BEGIN; INSERT INTO stacks(user_id, subject, category) VALUES (?,?,?);INSERT INTO cards(stack_id, question, answer, orig_source_stack) VALUES (LAST_INSERT_ID(),?,?,?);COMMIT",[userID,newSub,newCat,newQ,newA,whoMadeMe],(err,results)=>{
    //     if(err) throw err;
    //     response.json({success: true, msg:"stack created"})
    // });
    // connection.query({
    //     sql:"BEGIN;
    //         INSERT INTO stacks(user_id, subject, category)
    //         VALUES (?,?,?)
    //         INSERT INTO cards(stack_id,question,answer,orig_source_stack)
    //         VALUES(LAST_INSERT_ID(),?, ?,?);
    //         COMMIT;",
    //     values:['1']
    // },(err,results)=>{
    //     console.log(err);
    // });
});

//clicking myShelf
router.get('/myshelf/:uId',(request,response)=>{
    console.log('id of logged on user is: ',request.params.uId);
    let uid = request.params.uId;
    connection.query("SELECT s.subject as Subject, s.category as Category, s.created as Created, s.rating as Rating, u.username as User, COUNT(*) as Total FROM stacks s INNER JOIN cards c ON s.stack_id=c.stack_id INNER JOIN users u ON s.user_id=u.user_id WHERE u.user_id = ? GROUP BY c.stack_id ORDER BY s.subject",[uid],(err,results)=>{
        // connection.query("SELECT stacks.subject, stacks.category, stacks.created, stacks.rating, users.username FROM stacks JOIN users on stacks.user_id = users.user_id WHERE users.user_id = ?",[uid],(err,results)=>{
        if (err) console.log(err);
        //console log overview of logged-on user's acct...but they only show the username of the logged on user. not the source of stack creation.
        console.log('shelf overview',results);
        response.json({success:true, msg: "User Shelf Retrieved"});
    });
});
//clicking myshelf and deleting a whole stack, requires stack id from the front end
router.delete('/myshelf/:uId',(request,response)=>{
    let stackID = request.body.sID;
    connection.query("DELETE FROM stacks WHERE stack_id = ?",[stackID],(err,results)=>{
        response.json({success:true, msg:"whole stack deleted"});
    })
});



//Future Considerations below...Authentication will likely handle the login check and provide a token
//Authenticate
router.post('/authenticate',(request,response,next)=>{
    response.send('AUTHENTICATE');
});
//Profile
router.post('/profile',(request,response,next)=>{
    response.send('PROFILE');
});

module.exports = router;