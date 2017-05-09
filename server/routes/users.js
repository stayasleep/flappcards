const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const connection = require('../config/config'); // So connection credentials can be ignored
const config = require('../config/secret'); //keep the secret in a sep. directory[[maybe can do in config js]]
const bcrypt = require('bcryptjs'); // Hashing
const jwt = require('jsonwebtoken'); // For token

connection.connect((error) => {
    (error) ? (console.error('error connection: ' + error.stack)) : '';
    return;
});
//Register, token is sent and when return from server...it should include the user_id # inside and the username
router.post('/register',(request,response,next)=>{
    //get information from registration page
    // TODO Review the purpose of the 5 if blocks
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
// VERIFY TOKEN
// router.use((request, response, next)=> {
//     const token = request.body.token || request.query.token || request.headers['x-access-token'];
//     // decode token
//     if (token) {
//         // verifies secret and checks exp
//         jwt.verify(token, config.secret,(err, decoded)=> {
//             if (err) {
//                 return response.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 request.decoded = decoded;
//                 // console.log("decoded", decoded);
//                 // console.log("request.decoded", request.decoded);
//                 //response wil be sent by the next function...
//                 next();
//             }
//         });
//     } else {
//         // if there is no token
//         return response.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//     }
// });
router.post('/community', (request,response) => {
    //Community query
    let uid = request.decoded.UserID;
    connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, DATE_FORMAT(stacks.created,'%Y/%m/%d %H:%i') as 'createdOn', stacks.rating, cards.orig_source_stack AS 'createdBy', COUNT(*) as 'totalCards' FROM stacks JOIN cards on stacks.stack_id=cards.stack_id JOIN users ON stacks.user_id = users.user_id WHERE NOT users.user_id = ? GROUP BY cards.stack_id ORDER BY stacks.created DESC LIMIT 3",[uid],(err,results)=>{
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
    connection.query("SELECT stacks.stack_id FROM stacks WHERE stacks.user_id=? AND stacks.stack_id=?;",[uid,sid],(err,result)=>{
        if (err){
            response.send("Error Connecting");
        }
        if(result.length>0){
            connection.query("SELECT `cards`.`card_id`, `cards`.`orig_source_stack` AS 'createdBy', `cards`.`question`,`cards`.`answer` , `stacks`.`stack_id`, `stacks`.`subject`, `stacks`.`category` FROM `cards` " +
                "JOIN `stacks` ON `stacks`.`stack_id`= `cards`.`stack_id` " +
                "WHERE `stacks`.`stack_id`=?;", [sid], (err,results) => {
                console.log("results from navigating to stackOverview", results);
                if (err) {
                    response.send("Error on stack request");
                } else {
                    response.send(results);
                }
            });
        }else{
            //you don't own this stack
            response.send(false);
        }
    });
    // connection.query("SELECT `cards`.`card_id`, `cards`.`orig_source_stack` AS 'createdBy', `cards`.`question`,`cards`.`answer` , `stacks`.`stack_id`, `stacks`.`subject`, `stacks`.`category` FROM `cards` " +
    //     "JOIN `stacks` ON `stacks`.`stack_id`= `cards`.`stack_id` " +
    //     "WHERE `stacks`.`stack_id`=?;", [sid], (err,results) => {
    //     console.log("results from navigating to stackOverview", results);
    //     if (err) {
    //         response.send("Error on stack request");
    //     } else {
    //         response.send(results);
    //     }
    // });
});
//THIS ISNT READY
//click on a stack in home page or search  and it gets copied into your account, requires logged on user id and stack id , ---> should lead into the overview page
router.post('/stack/:uID/:sID',(request,response)=>{
    //let uid = request.decoded.UserID; //TOKEN OR URL
   let uid =request.params.uID;
   let sid=request.params.sID;
   console.log('sid',sid);
   // let commSubj =request.body.subject;
   // let commCat = request.body.category;
   // let idCopiedStack=null;
    connection.query("SELECT stacks.stack_id FROM stacks WHERE stacks.user_id = ? AND stacks.stack_id=?;",[uid,sid],(err,result)=>{
        if (err){
            response.send("Error Connecting");
        }
        console.log('res',result);
        console.log('res0',result[0]);
        //this means I have the copy and own it, hide the button
        if(result.length>0){
            connection.query("SELECT `cards`.`card_id`, `cards`.`orig_source_stack` AS 'createdBy', `cards`.`question`,`cards`.`answer` , `stacks`.`stack_id`, `stacks`.`subject`, `stacks`.`category` FROM `cards` " +
                "JOIN `stacks` ON `stacks`.`stack_id`= `cards`.`stack_id` " +
                "WHERE `stacks`.`stack_id`=?;", [sid], (err,results) => {
                console.log("results from navigating to stackOverview", results);
                if (err) {
                    response.send("Error on stack request");
                } else {
                    response.send(results);
                }
            });
        }else{
            //this information isnt in logged users data, make the clone button appear and show the overview
            console.log("copy this stack");
        }
    });
});
router.post('/copy/:stackId',(request,response)=>{
    let uid = request.decoded.UserID;
    let sId = request.params.stackId;
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

});



   //serch table rows with the stack id youre clicking on, if it exists in your rows already then DO NOT COPY!
   // connection.query("SELECT stacks.copied_stack FROM stacks WHERE stacks.copied_stack = ? AND stacks.user_id=?",[sid,uid],(err,result)=>{
   //     if (err){
   //         response.send("Error");
   //     }
   //     // let checkID = result[0].copied_stack;
   //     // console.log('result',result[0].copied_stack);
   //     console.log('resss', result);
   //     if(result.length === 0){
   //         console.log('undefined, this doesnt match your data');
   //     }else {
   //         // if (result[0].copied_stack == sid) {
   //             console.log("Hey this stack is in my rows already, dont copy");
   //             connection.query("SELECT `cards`.`card_id`, `cards`.`orig_source_stack` AS 'createdBy', `cards`.`question`,`cards`.`answer` , `stacks`.`stack_id`, `stacks`.`subject`, `stacks`.`category` FROM `cards` " +
   //                 "JOIN `stacks` ON `stacks`.`stack_id`= `cards`.`stack_id` " +
   //                 "WHERE `stacks`.`stack_id`=?;", [sid], (err, results) => {
   //                 console.log("results from navigating to stackOverview", results);
   //                 if (err) {
   //                     response.send("Error on stack request");
   //                 } else {
   //                     console.log('looking at some card overview');
   //                     response.send(results);
   //                 }
   //             });
   //     }});
   //below creates a new stack row and card rows from the copied to your account if you click COPY button
   // connection.query(
   //     "BEGIN; " +
   //     "INSERT INTO stacks(user_id, subject, category) VALUES (?,?,?); "+
   //     "INSERT INTO `cards` (stack_id, question, answer, orig_source_stack) "+
   //     "(SELECT LAST_INSERT_ID(), question, answer, orig_source_stack from `cards` WHERE  stack_id=?); "+
   //     "COMMIT;",[uid,commSubj,commCat,sid],(err,results)=>{
   //         if (err) throw err;
   //         let str=JSON.stringify(results);
   //         let strJ=JSON.parse(str);
   //         //this is the ID of the copied stack, can use to perform next query and redirect into stack overview
   //         idCopiedStack = strJ[1];
   //         console.log("user "+uid+" made a stack from stack "+sid,idCopiedStack.insertId);
   //         // response.json({success:true, msg:"Stack was just copied"});
   //     }
   // );
   //UNDO ABOVE
   //the idCOpiedStack doesnt work....this query depends on the one above
   // connection.query("SELECT card_id, question,answer,difficulty,orig_source_stack, last_updated FROM cards WHERE stack_id = ?",[idCopiedStack],(err,results)=>{
   //     if(err){
   //         response.send("Uh oh");
   //     }
   //     console.log("Ha, the last inserted ID produced these cards", results);
   //     response.json({success:true, msg:"Stack showing"});
   // })
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
router.post('/deleteCard/:cId',(request,response)=>{
    console.log("deleteCard request");
    let uid = request.decoded.UserID;
    let singleID = request.body.cardID;
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
//ADD CARD TO EXISTING STACK
router.post('/addSingleCard/:stackID',(request,response)=>{
    let un = request.decoded.UserName;
    let stackID = request.params.stackID;
    let addQ = request.body.cardObject.question;
    let addA = request.body.cardObject.answer;
    connection.query("INSERT INTO `cards`(`stack_id`, `question`, `answer`, `orig_source_stack`) VALUES (?,?,?,?)",[stackID,addQ,addA,un],(err,results)=>{
        if (err) {
            console.log('errrrrr');
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
        // console.log("results", results);
        let stackID = results.insertId;
        console.log("stackID", stackID);
        for (let i=0; i < numberOfCardsToInsert; i++) {
            let newQ = stack.stack[i].question;
            let newA = stack.stack[i].answer;
            console.log("In the for loop newQ", newQ);
            console.log("In the for loop newA", newA);
            // Sorry dan, had to just do it with a for loop
            connection.query("INSERT INTO cards (stack_id, question, answer, orig_source_stack) VALUES (?,?,?,?);", [stackID, newQ, newA, whoMadeMe], (err, results) => {
                if (err) {
                    console.log("inside error conditional");
                    return response.send("Could not complete insertion");
                }
                console.log("Inside the query function");
            });
        }
        response.send("Finished");
    });
    // let cardQueryPart1 = "INSERT INTO cards SET (stack_id, question, answer, orig_source_stack) VALUES"; // First part of insert query
    // let cardQueryPart2 = `(?,?,?,?);" ${[stackID, newQ, newA, whoMadeMe]} ` ; // LAST_INSERT_ID() is to keep them associated with the same stack  Second part of insert query quesitons and answers
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
//DELETING a whole stack, requires stack id from the front end
//clicking myShelf and deleting a whole stack, requires stack id from the front end
router.post('/deleteStack/:sID',(request,response)=>{
    console.log("Delete request");
    let uid = request.decoded.UserID;
    console.log("userID,", uid);
    let stackID = request.body.stackID;
    console.log("stackID", stackID);
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
router.post('/search',(request,response)=>{
    let uid =request.decoded.UserID;
    // let uid = request.params.id;
    let fromSearch = request.body.query.Search;
    console.log('uid', uid);
    console.log("request.body", request.body);
    console.log('search', fromSearch);
   connection.query(
       'SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.created, stacks.rating, cards.orig_source_stack, COUNT(*) as totalCards ' +
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
            console.log('updated user log out', result);
            response.send({success:true, message:"updated log out"});
        }
    })
});
//Profile retrieve some user information          DATE_FORMAT(stacks.created,'%d/%m/%Y %H:%i')
router.post('/profile',(request,response)=>{
    let un = request.decoded.UserID;
    connection.query("SELECT users.fullname, users.username, DATE_FORMAT(users.user_bday, '%Y/%m/%d') as 'user_bday', users.user_email, DATE_FORMAT(users.user_join, '%Y/%m/%d') as 'user_join' FROM users WHERE users.user_id =?",[un],(err,result)=>{
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