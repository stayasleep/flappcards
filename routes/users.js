const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)

//Register, token is sent and when return from server...it should include the user_id # inside and the username
router.post('/register',(request,response,next)=>{
    let newUser = {
        fullname: request.body.name,
        username: request.body.userName,
        user_pw: request.body.password,
        user_email:request.body.email,
        user_bday: request.body.birthday,
    };
    if(Object.keys(request.body).length===0){
        return response.json({success:false, error:"Invalid Submission"})
    }
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
    pool.getConnection((err,connection)=>{
        if(err){
            console.log("Error connecting to db",err);
            return response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(err);
        };
        connection.query("SELECT EXISTS(SELECT 1 FROM users WHERE username=?) as 'taken'",[newUser.username],(err,result)=> {
            //if result = 1 UN already exits, if 0 then username does not exists
            if (err) {
                response.send("Error handling request");
                console.log("Error handling request",err);
            }
            console.log('res', result[0].taken);
            if (result[0].taken === 1) { //UN exists
                // use return statement to jump out of the function to avoid setting headers after they've been sent
                // If the username is taken, send back userNameTaken: true; Now, would be a good time to consider status codes.
                return response.json({success: false, userNameTaken: true});
            }
            // Use bcrypt to salt and hash the password.
            // Use of salt + hash helps guard against use of rainbow tables
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.user_pw, salt, function (err, hash) {
                    newUser.user_pw = hash;
                    connection.query("INSERT INTO `users` SET ?", newUser, (err, results) => {
                        // Use JSON Web Token to issue and sign the user a token
                        // Set token to expire in 1 week for persistent login
                        let token = jwt.sign({UserName: newUser.username, UserID: results.insertId}, config.secret, {
                            expiresIn: 604800 //1 week in seconds
                        });
                        response.json({
                            success: true,
                            message: "User registered",
                            // msg: results,
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
    console.log('ip', request.ip);
    console.log('ips',request.ips);
    if(Object.keys(request.body).length===0){
        return response.json({success:false, msg: "Invalid Submission"})
    }
    if(!request.body.userName || !request.body.password){
        return response.json({success:false, msg:"invalid Submission Type"})
    }
    let usn = request.body.userName;
    let upw = request.body.password;
    //Query database to see if user exists in database
    pool.getConnection((error,connection)=>{
        if(error){
            console.log("Error connecting to db",error);
            return response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
        };
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
                        let token = jwt.sign({UserName: un,UserID: usersid },config.secret,{
                            expiresIn: 604800 //1 week in seconds
                        });
                        response.json({
                            success: true,
                            // message: result,
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
// VERIFY TOKEN
// *.use method acts as a funnel for requests
router.use((request, response, next)=> {
    // const token = request.body.token || request.query.token || request.headers['x-access-token'];
    const token = request.body.token;
    // decode token
    if (token) {
        // JWT verify method to check token information and secret
        jwt.verify(token, config.secret,(err, decoded)=> {
            if (err) {
                return response.json({ success: false, message: 'Failed to authenticate.' });
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
router.post('/community', (request,response,next) => {
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
        connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, DATE_FORMAT(stacks.created,'%Y/%m/%d %H:%i') as 'createdOn', stacks.rating as 'stackRating', cards.orig_source_stack AS 'createdBy', COUNT(*) as 'totalCards' FROM stacks JOIN cards on stacks.stack_id=cards.stack_id JOIN users ON stacks.user_id = users.user_id WHERE NOT users.user_id = ? GROUP BY cards.stack_id ORDER BY stacks.created DESC LIMIT 3",[uid],(error,results)=>{
            if (error) {
                response.send({success: false, message:"There was a problem with your request"});
            }
            else if (results.length > 0) {
                response.send(results);
            }
            else {
                response.send("No community stacks found");
            }
        });
        connection.release();
    })
});

// Recent stacks query; This gets called for the home page.
router.post('/home', (request,response,next)=> {
    let un = request.decoded.UserName;
    let ip = request.ip;
    console.log('my ip',ip);
    console.log('real ip', request.connection.remoteAddress);
    // Query the database for the user's recent stacks
    pool.getConnection((error, connection) => {
        if (error) {
            console.log("Error connecting to db", error);
            return response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(error);
        }
        connection.query("SELECT stacks.stack_id, stacks.subject, stacks.rating as 'stackRating', stacks.category, stacks.last_played as 'lastPlayed', DATE_FORMAT(stacks.created,'%Y/%m/%d %H:%i') as 'createdOn', stacks.rating, cards.orig_source_stack AS 'createdBy',COUNT(*) as 'totalCards'" +
            "FROM stacks join cards ON stacks.stack_id=cards.stack_id " +
            "JOIN users ON stacks.user_id = users.user_id WHERE users.username =? GROUP BY stacks.stack_id DESC LIMIT 2 ", [un], (error, results) => {
            if (error) {
                response.send({success: false, message: "There was a problem with your request"});
            } else if (results.length > 0) {
                response.send(results);
            } else {
                response.send("Looks like your shelf is empty. Create a stack or take a look at some of the community content below!");
            }
        });
        connection.release();
    })
});
// Associated Axios call: getStack;
// Made after clicking on view button on table
router.post('/stackOverview/:sID',(request,response,next) => {
    let uid = request.decoded.UserID;
    //if it exists and isnt empty
    if(request.params.sID) {
        let sid = request.params.sID;
        pool.getConnection((error, connection) => {
            if (error) {
                console.log("Error connecting to db", error);
                response.json({
                    success: false,
                    message: "Problem Connecting to DB"
                });
                // return next(error);
            }
            connection.query("SELECT stacks.stack_id FROM stacks WHERE stacks.user_id=? AND stacks.stack_id=?;", [uid, sid], (error, result) => {
                if (error) {
                    response.send({success: false, message: "There was a problem with your request"});
                }
                console.log('click stack', result.length);
                if (result.length > 0) {
                    //Stack is in your collection
                    connection.query("SELECT `cards`.`card_id`, `cards`.`orig_source_stack` AS 'createdBy', `cards`.`question`,`cards`.`answer` , `stacks`.`stack_id`, `stacks`.`subject`, `stacks`.`category` FROM `cards` " +
                        "JOIN `stacks` ON `stacks`.`stack_id`= `cards`.`stack_id` " +
                        "WHERE `stacks`.`stack_id`=?;", [sid], (error, results) => {
                        if (error) {
                            response.send({success: false, message: "There was a problem with your request"});
                        }
                        if (results.length > 0) {
                            results[0].isOwned = true;
                            console.log('results', results);
                            console.log('res0', results[0]);
                            response.send(results);
                        } else {
                            //results is now undefined, it is an [] array so pass back a success empty msg
                            console.log('shall not pass', results);
                            response.send(results);
                        }
                        // results[0].isOwned = true;
                        // console.log('one at a time',results);
                        // response.send(results);
                    });
                } else {
                    //If the stack is not initially in your collection
                    connection.query("SELECT `cards`.`card_id`, `cards`.`orig_source_stack` AS 'createdBy', `cards`.`question`,`cards`.`answer` , `stacks`.`stack_id`, `stacks`.`subject`, `stacks`.`category` FROM `cards` " +
                        "JOIN `stacks` ON `stacks`.`stack_id`= `cards`.`stack_id` " +
                        "WHERE `stacks`.`stack_id`=?;", [sid], (error, results) => {
                        if (error) {
                            response.send({success: false, message: "There was a problem with your request"});
                        }
                        console.log('not urs at first', results);
                        response.send(results);
                    });
                }
            });
            connection.release();
        })
    }else{
        return response.send({success:false, message:"Invalid Submission"})
    }
});

//CLICK THE COPY BUTTON, COPIES OTHER STACK INTO YOUR ACCOUNT
router.post('/copy/:stackId',(request,response,next)=>{
    let uid = request.decoded.UserID;
    let sId = request.params.stackId;

    //check to see if the request body object is empty
    if(Object.keys(request.body).length===0){
        return response.send({success:false, message:"Invalid Submission"});
    }
    //check to see if the subj and cat are empty strings
    if(!request.body.stack.subject){
        return response.send({success:false, message:"Invalid Submission Type"});
    }
    if(!request.body.stack.category){
        return response.send({success:false,message:"Invalid Submission Type"});
    }
    let commSubj = request.body.stack.subject;
    let commCat = request.body.stack.category;
    pool.getConnection((error,connection)=>{
        if(error){
            console.log("Error connecting to db",error);
            response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(error);
        }
        connection.query(
            "BEGIN; " +
            "INSERT INTO stacks(user_id, subject, category,copied_stack) VALUES (?,?,?,?); "+
            "INSERT INTO `cards` (stack_id, question, answer, orig_source_stack) "+
            "(SELECT LAST_INSERT_ID(), question, answer, orig_source_stack from `cards` WHERE  stack_id=?); "+
            "COMMIT;",[uid,commSubj,commCat,sId,sId],(error,results)=>{
                if (error){
                    response.send({success: false, message:"There was a problem with your query"});
                }
                //THE STACK ID OF THE COPIED STACK ON YOUR ACCOUNT NOW, SHOULD REDIRECT TO THIS STACK OVERVIEW
                let stackID = results[1].insertId;
                response.send({"stackID": stackID});
            }
        );
        connection.release();
    })
});


//DELETE INDIVIDUAL card from your stack overview
router.post('/deleteCard/:cId',(request,response,next)=>{
    let uid = request.decoded.UserID;
    if(request.body.cardID) {
        let singleID = request.body.cardID;
        pool.getConnection((error, connection) => {
            if (error) {
                console.log("Error connecting to db", error);
                return response.json({
                    success: false,
                    message: "Problem Connecting to DB"
                });
                // return next(error);
            }
            connection.query("DELETE cards FROM cards JOIN stacks ON cards.stack_id = stacks.stack_id WHERE stacks.user_id = ? AND cards.card_id = ?", [uid, singleID], (error, result) => {
                if (error) {
                    response.send({success: false, message: "There was a problem with your request"});
                } else if (result.length > 0) {
                    response.send("Card deleted from your stack.")
                } else {
                    response.send("Cannot be deleted at this time.");
                }
            });
            connection.release();
        })
    }else{
        return response.send({success:false, message:"Invalid Card Type"})
    }
});
//UPDATE INDIVIDUAL CARD FROM OVERVIEW
router.put('/stack/:cId',(request,response,next)=>{
    let singleID = request.params.cId;
    //check to see if body exists and then to see if values are empty
    if(Object.keys(request.body).length === 0){
        return response.json({success:false, message:"Invalid Submission"})
    }
    if(!request.body.cardQuestion || !request.body.cardAnswer){
        return response.json({success:false, message:"Invalid Submission Type"})
    }
    //get changed information
    let newQ = request.body.cardQuestion;
    let newA = request.body.cardAnswer;
    pool.getConnection((error,connection)=>{
        if(error){
            console.log("Error connecting to db",error);
            response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(error);
        }
        connection.query("UPDATE `cards` SET `question`=? , `answer`=? WHERE `card_id`=?",[newQ, newA, singleID],(error,results)=>{
            // If error, notify client that card edit failed
            if (error) {
                response.send({success: false, message:"There was a problem with your request"});
            }
            response.json({success:true, msg: "Single Card Updated"});
        });
        connection.release();
    })
});
//ADD CARD TO EXISTING STACK
router.post('/addSingleCard/:stackID',(request,response,next)=>{
    let un = request.decoded.UserName;
    let stackID = request.params.stackID;
    if(Object.keys(request.body).length===0){
        return response.json({success:false, message:"Invalid Submission"})
    }
    if(!request.body.cardObject){
        return response.json({success:false, message:"Invalid Submission Type"})
    }
    if(Object.keys(request.body.cardObject).length===0){
        return response.json({success:false, message:"Invalid Submission"})
    }
    if(!request.body.cardObject.question || !request.body.cardObject.answer){
        return response.json({success:false, message:"Invalid Submission Type"})
    }

    let addQ = request.body.cardObject.question;
    let addA = request.body.cardObject.answer;
    pool.getConnection((error,connection)=>{
        if(error){
            console.log("Error connecting to db",error);
            response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(error);
        }
        connection.query("INSERT INTO `cards`(`stack_id`, `question`, `answer`, `orig_source_stack`) VALUES (?,?,?,?)",[stackID,addQ,addA,un],(error,results)=>{
            if (error) {
                response.send({success: false, message:"There was a problem with your request"});
            }
            response.send("Added card to Stack");
        });
        connection.release();
    })
});
//CREATE STACK
router.post('/createCards',(request,response,next)=>{
    // had to remove :userID from url; they won't have the information, the token will
    if(Object.keys(request.body).length===0){
        return response.json({success:false,message:"Invalid Submission"})
    }
    //check is value is empty string
    if(!request.body.stackObject){
        return response.json({success:false,message:"Invalid Submission Type"})
    }
    if(Object.keys(request.body.stackObject).length === 0){
        return response.json({success:false, message:"Invalid Submission"})
    }
    let stack = request.body.stackObject;
    //check to see if values are empty
    if(!stack.subject || !stack.category){
        return response.json({success:false, message:"Invalid Submission Type"})
    }
    let newSub = stack.subject;
    let newCat = stack.category;
    let numberOfCardsToInsert = stack.stack.length;
    let whoMadeMe = request.decoded.UserName; // pull off user name from the token
    let userID = request.decoded.UserID; // pull off user ID from the token sent
    let stackQuery = "INSERT INTO stacks(user_id, subject, category) VALUES (?,?,?);";

    pool.getConnection((error,connection)=>{
        if(error){
            console.log("Error connecting to db",error);
            response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(error);
        }
        // Make the new stack first
        connection.query(`${stackQuery}`, [userID, newSub, newCat],(error, results) => {
            if (error) {
                return response.send({success: false, message:"There was a problem with your request"});
            }
            let stackID = results.insertId; // Use the insert id as the stackID
            for (let i=0; i < numberOfCardsToInsert; i++) {
                let newQ = stack.stack[i].question;
                let newA = stack.stack[i].answer;
                connection.query("INSERT INTO cards (stack_id, question, answer, orig_source_stack) VALUES (?,?,?,?);", [stackID, newQ, newA, whoMadeMe], (error, results) => {
                    if (error) {
                        response.send({success: false, message:"There was a problem with your request"});
                    }
                });
            }
            response.send({"stackID": stackID});
        });
        connection.release();
    })
});

//clicking myShelf and getting your overview,
// Tied to the getMyStackOverview action creator
router.post('/myShelf',(request,response,next)=> {
    let uid = request.decoded.UserID;
    pool.getConnection((error,connection)=>{
        if(error){
            console.log("Error connecting to db",error);
            response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(error);
        }
        // Query the database for all the user's stacks
        connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.last_played as 'lastPlayed', stacks.created, stacks.rating as 'stackRating', " +
            "cards.orig_source_stack, " +
            "COUNT(*) AS 'totalCards' FROM stacks " +
            "JOIN cards ON stacks.stack_id =cards.stack_id JOIN users on stacks.user_id = users.user_id WHERE users.user_id = ? " +
            "GROUP BY stacks.stack_id", [uid], (error, results) => {
            if (error) {
                response.send({success: false, message:"There was a problem with your request"});
            } else {
                response.send(results);
            }
        });
        connection.release();
    })
});
//clicking myShelf and deleting a whole stack, requires stack id from the front end
router.post('/deleteStack/:sID',(request,response,next)=>{
    let uid = request.decoded.UserID;
    //check to see if the body is empty and if the value exists
    if(Object.keys(request.body).length === 0){
        return response.json({success:false, message:"Invalid Submission"});
    }
    if(!request.body.stackID){
        return response.json({success:false, message:"Invalid Submission Type"});
    }

    let stackID = request.body.stackID;
    pool.getConnection((error,connection)=>{
        if(error){
            console.log("Error connecting to db",error);
            response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(error);
        }
        connection.query("DELETE FROM stacks WHERE user_id = ? AND stack_id = ?",[uid,stackID],(error,results)=>{
            if (error){
                response.send({success: false, message:"There was a problem with your request"});
            }else if (results>0){ //ask
                console.log('deleting stack',results);
                response.send(results);
            }else{
                //if i copy a stack and delete it from myshelf, this is what is sent.
                console.log('deleting the clone',results);
                response.send(results);
            }
        });
        connection.release();
    })
});
//SEARCH,
router.post('/search',(request,response,next)=>{
    let uid =request.decoded.UserID;

    //if there is no object in the body or an empty object
    if(Object.keys(request.body).length === 0 ) {
        console.log('reqbod empty', request.body);
        return response.json({success:false, message:"Invalid Submission"})
    }
    //if subObj is undefined
    if (!request.body.query) {
        console.log('userid', request.body.UserID);
        return response.json({success:false, message:"Invalid submission type"})
    }
    //if search is empty
    if(!request.body.query.Search){
        return response.json({success:false, message:"Invalid submission type"})
    }
    let fromSearch = request.body.query.Search;
    console.log('query',request.body.query);
    console.log('querySeach',request.body.query.Search);
    pool.getConnection((error,connection)=>{
        if(error){
            console.log("Error connecting to db",error);
            response.json({
                success: false,
                message: "Problem Connecting to DB"
            });
            // return next(error);
        }
        // Query the database for all stacks not from the user
        connection.query(
            'SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.created, stacks.rating, cards.orig_source_stack, COUNT(*) as totalCards ' +
            'FROM stacks JOIN cards on stacks.stack_id=cards.stack_id ' +
            'JOIN users ON stacks.user_id = users.user_id WHERE NOT users.user_id =? AND (stacks.subject LIKE "%"?"%" OR stacks.category LIKE "%"?"%") ' +
            'GROUP BY cards.stack_id ORDER BY stacks.created DESC;',[uid, fromSearch, fromSearch],(error,results)=>{
                if (error) {
                    response.send({success: false, message:"There was a problem with your request"});
                } else {
                    response.send(results);
                }
            });
        connection.release();
    })
});
//Log out, pass the token, update the users last_login from table
router.post('/logout',(request,response,next)=>{
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
//Profile retrieve some user information
router.post('/profile',(request,response,next)=>{
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
        connection.query("SELECT users.fullname, users.username, DATE_FORMAT(users.user_bday, '%Y/%m/%d') as 'user_bday', users.user_email, DATE_FORMAT(users.user_join, '%Y/%m/%d') as 'user_join' FROM users WHERE users.user_id =?",[un],(error,result)=>{
            if (error) {
                response.send({success: false, message:"There was a problem with your request"});
            } else{
                response.send(result);
            }
        });
        connection.release();
    })
});

module.exports = router;
