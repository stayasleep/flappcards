const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const connection = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)

connection.connect((error) => {
    (error) ? (console.error('error connection: ' + error.stack)) : '';
    return;
});
//Register, token is sent and when return from server...it should include the user_id # inside and the username
router.post('/register',(request,response,next)=>{
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

    // Use bcrypt to salt and hash the password.
    // Use of salt + hash helps guard against use of rainbow tables
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.user_pw, salt, function(err, hash) {
            newUser.user_pw = hash;
            connection.query("INSERT INTO `users` SET ?", newUser,(err,results)=>{
                // Use JSON Web Token to issue and sign the user a token
                // Set token to expire in 1 week for persistent login
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
    let usn = request.body.userName;
    let upw = request.body.password;
    //Query database to see if user exists in database
    connection.query("SELECT `username`,`user_id`, `user_pw` FROM `users` WHERE `username`=?",[usn],function(err,result) {
        if (err) {
            response.json({success: false, msg: "Username/Password not found"});
        }
        else if (result.length > 0) {
            let un = result[0].username;
            let hash = result[0].user_pw;
            let usersid = result[0].user_id;
            bcrypt.compare(upw, hash, function (err, res) {
            // If the user password matches, issue and sign the token
            if (res){
                let token = jwt.sign({UserName: un,UserID: usersid },config.secret,{
                    expiresIn: 604800 //1 week in seconds
                });
                response.json({
                    success: true,
                    message: result,
                    token: token
                });
                } else {
                    response.json({success: false, msg: "wrong pw"});
                }
            });
        }
        else {
            response.json({success: false, msg: "Username/Password not found"});
        }
    })
});
// VERIFY TOKEN
// *.use method acts as a funnel for requests
router.use((request, response, next)=> {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        // JWT verify method to check token information
        jwt.verify(token, config.secret,(err, decoded)=> {
            if (err) {
                return response.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if token signature was verified, decode the request and use next() to go to the next function
                request.decoded = decoded;
                next();
            }
        });
    } else {
        // If no token was received, send back a 403 error
        return response.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});
//COMMUNITY
router.post('/community', (request,response) => {
    // Query the database for all card stacks that do not belong to the user
    let uid = request.decoded.UserID;
    connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, DATE_FORMAT(stacks.created,'%Y/%m/%d %H:%i') as 'createdOn', stacks.rating, cards.orig_source_stack AS 'createdBy', COUNT(*) as 'totalCards' FROM stacks JOIN cards on stacks.stack_id=cards.stack_id JOIN users ON stacks.user_id = users.user_id WHERE NOT users.user_id = ? GROUP BY cards.stack_id ORDER BY stacks.created DESC LIMIT 3",[uid],(err,results)=>{
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
    // Query the database for the user's recent stacks
    connection.query("SELECT stacks.stack_id, stacks.subject, stacks.rating as 'stackRating', stacks.category, stacks.last_played as 'lastPlayed', DATE_FORMAT(stacks.created,'%Y/%m/%d %H:%i') as 'createdOn', stacks.rating, cards.orig_source_stack AS 'createdBy',COUNT(*) as 'totalCards'" +
        "FROM stacks join cards ON stacks.stack_id=cards.stack_id " +
        "JOIN users ON stacks.user_id = users.user_id WHERE users.username =? GROUP BY stacks.stack_id DESC LIMIT 2 ", [un], (err, results) => {
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
router.post('/stackOverview/:sID',(request,response) => {
    let uid = request.decoded.UserID;
    let sid = request.params.sID;
    connection.query("SELECT stacks.stack_id FROM stacks WHERE stacks.user_id=? AND stacks.stack_id=?;",[uid,sid],(err,result)=>{
        if (err){
            response.send("Error Connecting");
        }
        if(result.length>0){
            connection.query("SELECT `cards`.`card_id`, `cards`.`orig_source_stack` AS 'createdBy', `cards`.`question`,`cards`.`answer` , `stacks`.`stack_id`, `stacks`.`subject`, `stacks`.`category` FROM `cards` " +
                "JOIN `stacks` ON `stacks`.`stack_id`= `cards`.`stack_id` " +
                "WHERE `stacks`.`stack_id`=?;", [sid], (err, results) => {
                if (err) {
                    response.send("Error on stack request");
                }
                results[0].isOwned = true;
                response.send(results);
            });
        }else {
            connection.query("SELECT `cards`.`card_id`, `cards`.`orig_source_stack` AS 'createdBy', `cards`.`question`,`cards`.`answer` , `stacks`.`stack_id`, `stacks`.`subject`, `stacks`.`category` FROM `cards` " +
                "JOIN `stacks` ON `stacks`.`stack_id`= `cards`.`stack_id` " +
                "WHERE `stacks`.`stack_id`=?;", [sid], (err, results) => {
                if (err) {
                    response.send("Error on stack request");
                }
                response.send(results);
            });
        }
    });
});

//CLICK THE COPY BUTTON, COPIES OTHER STACK INTO YOUR ACCOUNT
router.post('/copy/:stackId',(request,response)=>{
    let uid = request.decoded.UserID;
    let sId = request.params.stackId;
    let commSubj = request.body.stack.subject;
    let commCat = request.body.stack.category;
    connection.query(
        "BEGIN; " +
        "INSERT INTO stacks(user_id, subject, category,copied_stack) VALUES (?,?,?,?); "+
        "INSERT INTO `cards` (stack_id, question, answer, orig_source_stack) "+
        "(SELECT LAST_INSERT_ID(), question, answer, orig_source_stack from `cards` WHERE  stack_id=?); "+
        "COMMIT;",[uid,commSubj,commCat,sId,sId],(err,results)=>{
            if (err){
                response.send("Error Connecting");
            }
            //THE STACK ID OF THE COPIED STACK ON YOUR ACCOUNT NOW, SHOULD REDIRECT TO THIS STACK OVERVIEW
            let stackID = results[1].insertId;
            response.send({"stackID": stackID});
        }
    );
});


//DELETE INDIVIDUAL card from your stack overview
router.post('/deleteCard/:cId',(request,response)=>{
    let uid = request.decoded.UserID;
    let singleID = request.body.cardID;
    connection.query("DELETE cards FROM cards JOIN stacks ON cards.stack_id = stacks.stack_id WHERE stacks.user_id = ? AND cards.card_id = ?",[uid,singleID],(err,result)=>{
        if (err){
            response.send("error");
        }else if(result.length>0){
            response.send("Card deleted from your stack.")
        }else{
            response.send("Cannot be deleted at this time.");
        }
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
        response.json({success:true, msg: "Single Card Updated"});
    });
});
//ADD CARD TO EXISTING STACK
router.post('/addSingleCard/:stackID',(request,response)=>{
    let un = request.decoded.UserName;
    let stackID = request.params.stackID;
    let addQ = request.body.cardObject.question;
    let addA = request.body.cardObject.answer;
    connection.query("INSERT INTO `cards`(`stack_id`, `question`, `answer`, `orig_source_stack`) VALUES (?,?,?,?)",[stackID,addQ,addA,un],(err,results)=>{
        if (err) {
            response.json({success: false, msg: "Failed to add card"});
        }
        response.send("Added card to Stack");
    })
});
//CREATE STACK
router.post('/createCards',(request,response)=>{
    // had to remove :userID from url; they won't have the information, the token will
    let stack = request.body.stackObject;
    let newSub = stack.subject;
    let newCat = stack.category;
    let numberOfCardsToInsert = stack.stack.length;
    let whoMadeMe = request.decoded.UserName; // pull off user name from the token
    let userID = request.decoded.UserID; // pull off user ID from the token sent
    let stackQuery = "INSERT INTO stacks(user_id, subject, category) VALUES (?,?,?);";
    // Make the new stack first
    connection.query(`${stackQuery}`, [userID, newSub, newCat],(err, results) => {
        if (err) {
            return response.send("Uh oh, something went wrong");
        }
        let stackID = results.insertId; // Use the insert id as the stackID
        for (let i=0; i < numberOfCardsToInsert; i++) {
            let newQ = stack.stack[i].question;
            let newA = stack.stack[i].answer;
            connection.query("INSERT INTO cards (stack_id, question, answer, orig_source_stack) VALUES (?,?,?,?);", [stackID, newQ, newA, whoMadeMe], (err, results) => {
                if (err) {
                    return response.send("Could not complete insertion");
                }
            });
        }
        response.send({"stackID": stackID});
    });
});

//clicking myShelf and getting your overview,
// Tied to the getMyStackOverview action creator
router.post('/myShelf',(request,response)=> {
    let uid = request.decoded.UserID;
    // Query the database for all the user's stacks
    connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.last_played as 'lastPlayed', stacks.created, stacks.rating as 'stackRating', " +
        "cards.orig_source_stack, " +
        "COUNT(*) AS 'totalCards' FROM stacks " +
        "JOIN cards ON stacks.stack_id =cards.stack_id JOIN users on stacks.user_id = users.user_id WHERE users.user_id = ? " +
        "GROUP BY stacks.stack_id", [uid], (err, results) => {
        if (err) {
            response.send("Uh oh"); // Probably need to send something a bit better than 'uh oh', but this stops the server from crashing
        } else {
            response.send(results);
        }
    });
});
//DELETING a whole stack, requires stack id from the front end
//clicking myShelf and deleting a whole stack, requires stack id from the front end
router.post('/deleteStack/:sID',(request,response)=>{
    let uid = request.decoded.UserID;
    let stackID = request.body.stackID;
    connection.query("DELETE FROM stacks WHERE user_id = ? AND stack_id = ?",[uid,stackID],(err,results)=>{
        if (err){
            response.send("um ok");
        }else if (results>0){
            response.send(results);
        }else{
            response.send("Cannot delete Stack");
        }
    })
});
//SEARCH,
router.post('/search',(request,response)=>{
    let uid =request.decoded.UserID;
    let fromSearch = request.body.query.Search;
    // Query the database for all stacks not from the user
   connection.query(
       'SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.created, stacks.rating, cards.orig_source_stack, COUNT(*) as totalCards ' +
       'FROM stacks JOIN cards on stacks.stack_id=cards.stack_id ' +
       'JOIN users ON stacks.user_id = users.user_id WHERE NOT users.user_id =? AND (stacks.subject LIKE "%"?"%" OR stacks.category LIKE "%"?"%") ' +
       'GROUP BY cards.stack_id ORDER BY stacks.created DESC;',[uid, fromSearch, fromSearch],(err,results)=>{
           if (err) {
               response.send("Uh oh");
           } else {
               response.send(results);
           }
       }
   )
});
//Log out, pass the token, update the users last_login from table
router.post('/logout',(request,response)=>{
    let un =request.decoded.UserName;
    connection.query("UPDATE `users` SET `last_login`=CURRENT_TIMESTAMP WHERE user_id=?",[un],(err,result)=>{
        if (err) {
            response.send("Failed to log user out");
        }else {
            response.send({success:true, message:"updated log out"});
        }
    })
});
//Profile retrieve some user information
router.post('/profile',(request,response)=>{
    let un = request.decoded.UserID;
    connection.query("SELECT users.fullname, users.username, DATE_FORMAT(users.user_bday, '%Y/%m/%d') as 'user_bday', users.user_email, DATE_FORMAT(users.user_join, '%Y/%m/%d') as 'user_join' FROM users WHERE users.user_id =?",[un],(err,result)=>{
        if (err) {
            response.send("Uh oh");
        } else{
            response.send(result);
        }
    })
});

module.exports = router;
