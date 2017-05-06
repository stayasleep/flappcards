const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const connection = require('../config/config'); // So connection credentials can be ignored
const config = require('../config/secret'); //keep the secret in a sep. directory[[maybe can do in confic js]]
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//temporary, for now leave the db and connections on the same page

connection.connect((error) => {
    (error) ? (console.error('error connection: ' + error.stack)) : '';
    return;
});

//Register, token is sent and when return from server...it should include the user_id # inside and the username
router.post('/register',(request,response,next)=>{
    //get information from registration page
    let newUser = {
        fullname: request.body.name,
        username: request.body.userName,
        user_pw: request.body.password,
        user_email:request.body.email,
        user_bday: request.body.birthday,
    };
    console.log('pw is ', newUser.user_pw);
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.user_pw, salt, function(err, hash) {
            newUser.user_pw = hash;
            connection.query("INSERT INTO `users` SET ?", newUser,(err,results)=>{
                if(err) throw err;
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
                // response.json({success: true, msg: "User Registered"});
            })
        });
    });
});
//test login comparison
router.post('/login',function(request,response){
    console.log(request.body);
    let un = request.body.userName;
    let upw = request.body.password;
    //call db
    connection.query("SELECT `user_id`, `user_pw` FROM `users` WHERE `username`=?",[un],function(err,result) {
        // if (err) throw err; // We can't just throw an error here. If the person mistypes their username, the server quits.
        if (err) {
            response.send(false);
        }
        else {
            console.log('res',result);
            let str = JSON.stringify(result); // Result of query
            console.log("JSON.stringify(result)", str);
            let strJ = JSON.parse(str);
            let usersid= strJ[0].user_id;
            console.log("JSON.parse(str)", strJ);
            let hash = strJ[0].user_pw;
            console.log('password db', hash);
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
                    response.json({success: false, msg: "wrong pw"});
                }

            });
        }
    })
});

router.post('/community', (request,response) => {

    //Community query
    connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.created, stacks.rating, cards.orig_source_stack, COUNT(*) as Total FROM stacks JOIN cards on stacks.stack_id=cards.stack_id JOIN users ON stacks.user_id = users.user_id WHERE NOT users.user_id = ? GROUP BY cards.stack_id ORDER BY stacks.created DESC LIMIT 2 ",[un],(err,results)=>{
        if (err) throw err;
        //console log to see if the metadata from the community is retrieved before redirect
        console.log('comm results',results);
        response.send(results);
    });
});


// Recent stacks query; This gets called for the home page...
router.post('/home', (request,response)=> {
    let token = request.body.token;
    let un = request.body.userName; // had to intentionally send a kchalm username. In the process of upgrading to tokens, request.decoded.UserName
    if(token){
        jwt.verify(token,config.secret,function (err,decoded) {
            if (err){
                return response.json({success: false, message: "Failed to authenticate token."});
            }else{
                request.decoded = decoded;
                console.log('token verified, ', request.decoded); //dont delete andres
                connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.last_played, stacks.rating, cards.orig_source_stack,COUNT(*) as Total from stacks join cards ON stacks.stack_id=cards.stack_id JOIN users on stacks.user_id = users.user_id WHERE users.username =? GROUP BY stacks.last_played DESC LIMIT 2 ",[un],(err,results)=>{
                    if (err) throw err;
                    //console log to see if the metadata from your account is retrieved before redirect
                    console.log('my results',results);
                    //do stuff with jwt here;
                    response.send(results);
                });
            }
        })
    } else{
        return response.status(403).send({
            success: false,
            message: "No token provided"
        })
    }
    // let un = request.body.userName; // had to intentionally send a kchalm username. In the process of upgrading to tokens

    // Recent query
    // connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.last_played, stacks.rating, cards.orig_source_stack,COUNT(*) as Total from stacks join cards ON stacks.stack_id=cards.stack_id JOIN users on stacks.user_id = users.user_id WHERE users.username =? GROUP BY stacks.last_played DESC LIMIT 2 ",[un],(err,results)=>{
    //     if (err) throw err;
    //     //console log to see if the metadata from your account is retrieved before redirect
    //     console.log('my results',results);
    //     //do stuff with jwt here;
    //     response.send(results);
    // });
});

// Associated Axios call: getStack;
// Made after clicking on view from my shelf
//TODO implement /stackOverview/:uID/:sID version?
router.post('/stackOverview/:sID',(request,response) => {
    let uid = request.body.uID;
    let sid = request.params.sID;
    console.log(request.body);
    connection.query("SELECT `cards`.`card_id`, `cards`.`question`,`cards`.`answer` , `stacks`.`stack_id`, `stacks`.`subject`, `stacks`.`category` FROM `cards` " +
    "JOIN `stacks` ON `stacks`.`stack_id`= `cards`.`stack_id` " +
    "WHERE `stacks`.`stack_id`=?;", [sid], (err,results) => {
        if (err) {
            response.send("Error on stack request");
        } else {

            response.send(results);
        }
    });
});

//click on a stack in home page or search  and it gets copied into your account, requires logged on user id and stack id , ---> should lead into the overview page
router.post('/stack/:uID/:sID',(request,response)=>{
   let uid =request.params.uID;
   let sid=request.params.sID;
   let commSubj =request.body.subject;
   let commCat = request.body.category;
   var idCopiedStack=null;
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
       if (err) throw err;
       console.log("Ha, the last inserted ID produced these cards", results);
       response.json({success:true, msg:"Stack showing"});
   })
});


//
//delete an individual card from your stack overview , requires card id from the stackov page
router.delete('/stack/:cId',(request,response)=>{
    let singleID = request.params.cId;
    console.log('single id coming from card',singleID);
    connection.query("DELETE FROM `cards` WHERE card_id=?",[singleID],(err,result)=>{
        if (err) throw err;
        response.json({success:true, msg:"Single Card deleted"});
        console.log('rows deleted: ', result.affectedRows);
    });
});
//update an individual card from your stack overview, requires card id from the stack overview page
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
//create stack by clicking any create button, [userID is from logged in user and so is username] only creates 1 card atm
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
        console.log(userID+" Made A Stack with 1 q and a");
        response.json({success:true, msg:"Stack was just created"});
    });
});

//clicking myShelf and getting your overview, requires logged on user id and you will get the stack id as attributes
// Tied to the getMyStackOverview action creator
router.get('/myshelf/:uId',(request,response)=>{
    console.log('id of logged on user is: ',request.params.uId);
    let uid = request.params.uId;
    // Select all the cards from a deck where
    // connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.last_played, stacks.rating, cards.orig_source_stack,COUNT(*)as Total from stacks JOIN cards ON stacks.stack_id =cards.stack_id JOIN users on stacks.user_id = users.user_id WHERE users.user_id = ? GROUP BY stacks.subject" ,[uid],(err,results)=>{
        //if (err) console.log(err); // This needs to be changed to something like:
        // if (results.length === 0) {response.send("Error")} else{ the rest of the results
        //console log overview of logged-on user's acct...but they only show the username of the logged on user. not the source of stack creation.
        // console.log('shelf overview',results);
        // response.json({success:true, msg: "User Shelf Retrieved"}); The default response type for Axios is JSON, so specifying it here may not be necessary
        // response.send(results);
    // });
    // Added AS statements to match what front end is expecting
    connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.last_played, stacks.rating as 'stackRating', " +
        "cards.orig_source_stack, " +
        "COUNT(*) AS 'totalCards' FROM stacks " +
        "JOIN cards ON stacks.stack_id =cards.stack_id JOIN users on stacks.user_id = users.user_id WHERE users.user_id = ? " +
        "GROUP BY stacks.subject",[uid], (err,results) => {
        if (err){
            console.log(err);
            response.send("Uh oh"); // Probably need to send something a bit better than 'uh oh', but this stops the server from crashing
        } else {
            response.send(results);
        }
    })
});
//clicking myShelf and deleting a whole stack, requires stack id from the front end
router.delete('/myshelf/:uId',(request,response)=>{
    let stackID = request.body.sID;
    connection.query("DELETE FROM stacks WHERE stack_id = ?",[stackID],(err,results)=>{
        response.json({success:true, msg:"whole stack deleted"});
    })
});
//Search, need the logged on user_id and the search parameter.....should give you a stack overview. Doesn't work, ask why result is empty..but it works on mysql
router.get('/search/:id/:searchid',(request,response)=>{
    let uid = request.params.id;
    let fromSearch = request.params.searchid;
   connection.query(
       "SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.created, stacks.rating, cards.orig_source_stack, COUNT(*) as Total " +
       "FROM stacks JOIN cards on stacks.stack_id=cards.stack_id " +
       "JOIN users ON stacks.user_id = users.user_id WHERE NOT users.user_id =? AND (stacks.subject OR stacks.category LIKE '%'?) " +
       "GROUP BY cards.stack_id ORDER BY stacks.created DESC;",[uid,fromSearch],(err,results)=>{
       if (err) throw err;
       console.log("youre searching for ",fromSearch);
       console.log("response",response);
       console.log("searched results ",results);
       response.json({success:true, msg: "Youre Searching"});
       }
   )
});

router.post('/logout',(request,response)=>{
    let token = request.body.token;
    let un =request.decoded.UserName;
    connection.query("UPDATE `users` SET `last_login`=CURRENT_TIMESTAMP WHERE user_id=?",)
})

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

//trying t0 make a function to call instead of listing it everywhere
function verifyToken(token){
    let un ;// had to intentionally send a kchalm username. In the process of upgrading to tokens, request.decoded.UserName
    if(token){
        jwt.verify(token,config.secret,function (err,decoded) {
            if (err){
                return response.json({success: false, message: "Failed to authenticate token."});
            }else{
                request.decoded = decoded;
                console.log('token verified, ', request.decoded); //dont delete andres
                connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.last_played, stacks.rating, cards.orig_source_stack,COUNT(*) as Total from stacks join cards ON stacks.stack_id=cards.stack_id JOIN users on stacks.user_id = users.user_id WHERE users.username =? GROUP BY stacks.last_played DESC LIMIT 2 ",[un],(err,results)=>{
                    if (err) throw err;
                    //console log to see if the metadata from your account is retrieved before redirect
                    console.log('my results',results);
                    //do stuff with jwt here;
                    response.send(results);
                });
            }
        })
}}