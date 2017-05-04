const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');

//temporary, for now leave the db and connections on the same page
const connection = mysql.createConnection({
    multipleStatements: true,
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
    let un = request.body.userName;
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
            //check if pw match, if they do, should send them a token with their user id and username from login
            console.log('the passwords match');
            //return the stack id and store it somewhere, maybe as an attribute but dont display it onto the dashboard
            connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.last_played, stacks.rating, cards.orig_source_stack,COUNT(*) as Total from stacks join cards ON stacks.stack_id=cards.stack_id JOIN users on stacks.user_id = users.user_id WHERE users.username =? ORDER BY stacks.last_played DESC LIMIT 1",[un],(err,results)=>{
                if (err) throw err;
                //console log to see if the metadata from your account is retrieved before redirect
                console.log('my results',results);
                response.send(true);
            } );
            //returns the stack id, which should be used as an attribute and not on the page
            connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.created, stacks.rating, cards.orig_source_stack, COUNT(*) as Total FROM stacks JOIN cards on stacks.stack_id=cards.stack_id JOIN users ON stacks.user_id = users.user_id WHERE NOT users.user_id = ? GROUP BY cards.stack_id ORDER BY stacks.created DESC LIMIT 2 ",[un],(err,results)=>{
                if (err) throw err;
                //console log to see if the metadata from the community is retrieved before redirect
                console.log('comm results',results);
            });
            // response.redirect('/home');
        }else{
            // response.statusCode = 404;
            // response.write("404 Sorry Not Found");
            response.end();
        }
    })
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
    //make call to send info to db
    connection.query("INSERT INTO `users` SET ?", newUser, (err, results)=>{
        if(err) throw err;
        console.log('ID of the inserted user row', results.insertId);
        response.JSON({success: true, msg: "User Registered"});
    })
});



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

//clicking myShelf and getting your overview, requires logged on user id and you will get the stack id as attrib
router.get('/myshelf/:uId',(request,response)=>{
    console.log('id of logged on user is: ',request.params.uId);
    let uid = request.params.uId;
    connection.query("SELECT stacks.stack_id, stacks.subject, stacks.category, stacks.last_played, stacks.rating, cards.orig_source_stack,COUNT(*)as Total from stacks JOIN cards ON stacks.stack_id =cards.stack_id JOIN users on stacks.user_id = users.user_id WHERE users.user_id = ? GROUP BY stacks.subject" ,[uid],(err,results)=>{
        if (err) console.log(err);
        //console log overview of logged-on user's acct...but they only show the username of the logged on user. not the source of stack creation.
        console.log('shelf overview',results);
        response.json({success:true, msg: "User Shelf Retrieved"});
    });
});
//clicking myShelf and deleting a whole stack, requires stack id from the front end
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