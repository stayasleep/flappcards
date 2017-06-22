const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)


//clicking myShelf and getting your overview,
// Tied to the getMyStackOverview action creator
router.post('/',(request,response,next)=> {
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
router.delete('/:sID',(request,response,next)=>{
    let uid = request.decoded.UserID;
    //check to see if the body is empty and if the value exists
    if(Object.keys(request.params).length === 0){
        return response.json({success:false, message:"Invalid Submission"});
    }
    if(!request.params.sID){
        return response.json({success:false, message:"Invalid Submission Type"});
    }

    let stackID = request.params.sID;
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
                response.send(results);
            }else{
                //if i copy a stack and delete it from myshelf, this is what is sent.
                response.send(results);
            }
        });
        connection.release();
    })
});
module.exports = router;
