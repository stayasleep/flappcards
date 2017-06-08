const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)

//CLICK THE COPY BUTTON, COPIES OTHER STACK INTO YOUR ACCOUNT
router.post('/:sID',(request,response,next)=>{
    let uid = request.decoded.UserID;
    let sId = request.params.sID;

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

module.exports =router;