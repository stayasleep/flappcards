const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const connection = require('../config/config'); // So connection credentials can be ignored
const config = require('../config/secret'); //keep the secret in a sep. directory[[maybe can do in confic js]]
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

connection.connect((error) => {
    (error) ? (console.error('error connection: ' + error.stack)) : '';
    return;
});
//Register, token is sent and when return from server...it should include the user_id # inside and the username
router.post('/register',(request,response,next)=>{
    //get information from registration page
    console.log("Register request", request.body);
    let newUser = {
        fullname: request.body.name,
        username: request.body.userName,
        user_pw: request.body.password,
        user_email:request.body.email,
        user_bday: request.body.birthday,
    };
    if(newUser.userName && !/^[a-zA-Z0-9]{6,20}/i.test(newUser.userName)){
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
    console.log('pw is ', newUser.user_pw);
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.user_pw, salt, function(err, hash) {
            newUser.user_pw = hash;
            connection.query("INSERT INTO `users` SET ?", newUser,(err,results)=>{

                console.log('ID of the inserted user row', results.insertId);
                //do stuff with jwt here
                let token = jwt.sign({UserName: newUser.username,UserID:results.insertId},config.secret,{
                    expiresIn: 604800 //1 week in seconds
                });
                response.json({
                    success: true,
                    message: "User registered",
                    msg: results,
                    token: token
                });
            })
        });
    });
});
//test login comparison
router.post('/login',function(request,response){
    // console.log(request.body);
    let usn = request.body.userName;
    let upw = request.body.password;
    console.log('un ',usn);
    console.log('upw ',upw);
    //call db
    connection.query("SELECT `username`,`user_id`, `user_pw` FROM `users` WHERE `username`=?",[usn],function(err,result) {
        // if (err) throw err; // We can't just throw an error here. If the person mistypes their username, the server quits.
        // Do not give the user a token if error
        if (err) {
            console.log('error');
            response.json({success: false, msg: "Username/Password not found"});
        }
        else if (result.length > 0) {
            console.log('res',result);
            console.log("result[0]", result[0].username);
            let un = result[0].username;
            let hash = result[0].user_pw;
            let usersid = result[0].user_id;
            // This is the hashed password
            bcrypt.compare(upw, hash, function (err, res) {
            // res === true
            if (res){
                console.log('the passwords match');
                console.log(res);
                let token = jwt.sign({UserName: un,UserID: usersid },config.secret,{
                    expiresIn: 604800 //1 week in seconds
                });
                response.json({
                    success: true,
                    message: result,
                    token: token
                });
                } else {
                    console.log(err);
                    console.log("Wrong password");
                    response.json({success: false, msg: "wrong pw"});
                }
            });
        }
        else {
            console.log('u though');
            response.json({success: false, msg: "Username/Password not found"});
        }
    })
});
//VERIFY TOKEN
router.use((request, response, next)=> {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret,(err, decoded)=> {
            if (err) {
                return response.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                request.decoded = decoded;
                // console.log("decoded", decoded);
                // console.log("request.decoded", request.decoded);
                //response wil be sent by the next function...
                next();
            }
        });
    } else {
        // if there is no token
        return response.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});
router.post('/community', (request,response) => {
    //Community query
    let uid = request.decoded.UserID;
    connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, DATE_FORMAT(stacks.created,'%d/%m/%Y %H:%i') as 'createdOn', stacks.rating, cards.orig_source_stack AS 'createdBy', COUNT(*) as 'totalCards' FROM stacks JOIN cards on stacks.stack_id=cards.stack_id JOIN users ON stacks.user_id = users.user_id WHERE NOT users.user_id = ? GROUP BY cards.stack_id ORDER BY stacks.created DESC LIMIT 3",[uid],(err,results)=>{
        //TODO error handling
        if (err) {
            response.send("Uh oh");
        }
        else if (results.length > 0) {
            response.send(results);
        }
        else {
            response.send("No community stacks found");
        }
    });
});

// Recent stacks query; This gets called for the home page.
router.post('/home', (request,response)=> {
    let un = request.decoded.UserName;
    connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.last_played, stacks.rating, cards.orig_source_stack AS 'createdBy',COUNT(*) as 'totalCards'" +
        "FROM stacks join cards ON stacks.stack_id=cards.stack_id " +
        "JOIN users ON stacks.user_id = users.user_id WHERE users.username =? GROUP BY stacks.last_played DESC LIMIT 1 ", [un], (err, results) => {
        if (err) {
            response.send("Uh oh");
        } else if (results.length > 0) {
            response.send(results);
        } else {
            response.send("Looks like your shelf is empty. Create a stack or take a look at some of the community content below!");
        }
    })
});

// Associated Axios call: getStack;
// Made after clicking on view button on table
//TODO implement /stackOverview/:uID/:sID version?
router.post('/stackOverview/:sID',(request,response) => {
    let uid = request.decoded.UserID;
    let sid = request.params.sID;
    console.log("stackOverview", request.body);
    // connection.query("SELECT stack_id FROM stacks WHERE NOT user_id =?",[uid],(err,result)=>{
    //     if (err){
    //         response.send("Uh Oh");
    //     }else if (result.length>0){
    //
    //     }
    //     console.log("result",result);
    // });
    connection.query("SELECT `cards`.`card_id`, `cards`.`question`,`cards`.`answer` , `stacks`.`stack_id`, `stacks`.`subject`, `stacks`.`category` FROM `cards` " +
        "JOIN `stacks` ON `stacks`.`stack_id`= `cards`.`stack_id` " +
        "WHERE `stacks`.`stack_id`=?;", [sid], (err,results) => {
        console.log("results from navigating to stackOverview", results);
        if (err) {
            response.send("Error on stack request");
        } else {
            response.send(results);
        }
    });
});
//THIS ISNT READY
//click on a stack in home page or search  and it gets copied into your account, requires logged on user id and stack id , ---> should lead into the overview page
router.post('/stack/:uID/:sID',(request,response)=>{
    //let uid = request.decoded.UserID; //TOKEN OR URL
   let uid =request.params.uID;
   let sid=request.params.sID;
   let commSubj =request.body.subject;
   let commCat = request.body.category;
   let idCopiedStack=null;
   connection.query(
       "BEGIN; " +
       "INSERT INTO stacks(user_id, subject, category) VALUES (?,?,?); "+
       "INSERT INTO `cards` (stack_id, question, answer, orig_source_stack) "+
       "(SELECT LAST_INSERT_ID(), question, answer, orig_source_stack from `cards` WHERE  stack_id=?); "+
       "COMMIT;",[uid,commSubj,commCat,sid],(err,results)=>{
           if (err) throw err;
           let str=JSON.stringify(results);
           let strJ=JSON.parse(str);
           //this is the ID of the copied stack, can use to perform next query and redirect into stack overview
           idCopiedStack = strJ[1];
           console.log("user "+uid+" made a stack from stack "+sid,idCopiedStack.insertId);
           // response.json({success:true, msg:"Stack was just copied"});
       }
   );
   //the idCOpiedStack doesnt work....this query depends on the one above
   connection.query("SELECT card_id, question,answer,difficulty,orig_source_stack, last_updated FROM cards WHERE stack_id = ?",[idCopiedStack],(err,results)=>{
       if(err){
           response.send("Uh oh");
       }
       console.log("Ha, the last inserted ID produced these cards", results);
       response.json({success:true, msg:"Stack showing"});
   })
});
//shows Q and A of the stack you selected MAYBE THIS IS NOT NEEEDED.
router.post('/stackOverview/', (request,response) => {
    console.log("getCard request", request.body);
    connection.query("SELECT card_id, question,answer,difficulty,orig_source_stack, last_updated FROM cards WHERE stack_id = ?",[idCopiedStack],(err,results)=> {
        if (err) {
            response.send("Error");
        }
        else {
            console.log("Ha, the last inserted ID produced these cards", results);
            response.json({success: true, msg: "Stack showing"});
        }
    })
});
//END THIS ISNT READY

//DELETE INDIVIDUAL card from your stack overview
router.delete('/stack/:cId',(request,response)=>{
    let uid = request.decoded.UserID;
    let singleID = request.params.cId;
    console.log('single id coming from card',singleID);
    connection.query("DELETE cards FROM cards JOIN stacks ON cards.stack_id = stacks.stack_id WHERE stacks.user_id = ? AND cards.card_id = ?",[uid,singleID],(err,result)=>{
    // connection.query("DELETE FROM `cards` WHERE card_id=?",[singleID],(err,result)=>{ //I THINK THE ONE ABOVE WORKS BETTER, MUST MATCH USER TO CARD OWNER
        if (err){
            response.send("error");
        }else if(result.length>0){
            response.send("Card deleted from your stack.")
        }else{
            response.send("Cannot be deleted at this time.");
        }
        // if (err) {
        //     return response.json({success: false, msg: "Card deletion failed"})
        // }
        // console.log('rows deleted: ', result.affectedRows);
        // response.json({success:true, msg:"Single Card deleted"});
    });
});
//UPDATE INDIVIDUAL CARD FROM OVERVIEW
router.put('/stack/:cId',(request,response)=>{
    let singleID = request.params.cId;
    //get changed information
    let newQ = request.body.cardQuestion;
    let newA = request.body.cardAnswer;
    connection.query("UPDATE `cards` SET `question`=? , `answer`=? WHERE `card_id`=?",[newQ, newA, singleID],(err,results)=>{
        // If error, notify client that card edit failed
        if (err) {
            response.json({success:false, msg: "Failed to updated"});
        }
        console.log('updated',results.affectedRows);
        response.json({success:true, msg: "Single Card Updated"});
    });
});
//CREATE STACK, only creates 1 card atm
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
            if (err){
                response.send("Uh Oh");
            }
        console.log(userID+" Made A Stack with 1 q and a");
        response.json({success:true, msg:"Stack was just created"});
    });
});

//clicking myShelf and getting your overview,
// Tied to the getMyStackOverview action creator
router.post('/myShelf',(request,response)=> {
    console.log("request.body", request.body);
    let uid = request.decoded.UserID;
    connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.last_played, stacks.rating as 'stackRating', " +
        "cards.orig_source_stack, " +
        "COUNT(*) AS 'totalCards' FROM stacks " +
        "JOIN cards ON stacks.stack_id =cards.stack_id JOIN users on stacks.user_id = users.user_id WHERE users.user_id = ? " +
        "GROUP BY stacks.subject", [uid], (err, results) => {
        if (err) {
            console.log(err);
            response.send("Uh oh"); // Probably need to send something a bit better than 'uh oh', but this stops the server from crashing
        } else {
            response.send(results);
        }
    });
});

//clicking myShelf and deleting a whole stack, requires stack id from the front end
router.delete('/myshelf/:sId',(request,response)=>{
    let stackID = request.body.sID;
    let uid = request.decoded.UserID;
    connection.query("DELETE FROM stacks WHERE user_id = ? AND stack_id = ?",[uid,stackID],(err,results)=>{
        if (err){
            response.send("um ok");
        }else if (results>0){
            response.send(results);
        }else{
            response.send("Cannot delete Stack");
        }
        // response.json({success:true, msg:"whole stack deleted"});
    })
});
//SEARCH,
router.post('/search/:id',(request,response)=>{
    let uid =request.decoded.UserID;
    // let uid = request.params.id;
    let fromSearch = request.body.searchid;
    console.log('uid', uid);
    console.log('search', fromSearch);
   connection.query(
       'SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.created, stacks.rating, cards.orig_source_stack, COUNT(*) as Total ' +
       'FROM stacks JOIN cards on stacks.stack_id=cards.stack_id ' +
       'JOIN users ON stacks.user_id = users.user_id WHERE NOT users.user_id =? AND (stacks.subject LIKE "%"?"%" OR stacks.category LIKE "%"?"%") ' +
       'GROUP BY cards.stack_id ORDER BY stacks.created DESC;',[uid, fromSearch, fromSearch],(err,results)=>{
           if (err) {
               response.send("Uh oh");
           }else{
               console.log("youre searching for ",fromSearch);
               // console.log("response",response);
               console.log("searched results ",results);
               response.send(results);
           }
       }
   )
});
//Log out, pass the token, update the users last_login from table
router.post('/logout',(request,response)=>{
    let un =request.decoded.UserName;
    console.log('un ',un);
    connection.query("UPDATE `users` SET `last_login`=CURRENT_TIMESTAMP WHERE user_id=?",[un],(err,result)=>{
        if (err) {
            response.send("Uh oh");
        }else{
            console.log('updated user log out', result);
            response.send({success:true, message:"updated log out"});
        }
    })
});
//Profile retrieve some user information
router.post('/profile',(request,response)=>{
    let un = request.decoded.UserID;
    connection.query("SELECT users.fullname, users.username, users.user_bday, users.user_email,users.user_join FROM users WHERE users.user_id =?",[un],(err,result)=>{
        console.log(result);
        if (err) {
            response.send("Uh oh");
        } else{
            console.log("USER ID IS NOW LOGGED OFF ",un);
            console.log("results ",result);
            response.send(result);
        }
    })
});

module.exports = router;