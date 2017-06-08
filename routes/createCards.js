const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)

//CREATE STACK
router.post('/',(request,response,next)=>{
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
module.exports = router;
