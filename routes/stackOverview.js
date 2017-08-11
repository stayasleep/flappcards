const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)

// Associated Axios call: getStack;
// Made after clicking on view button on table
router.get('/:sID',(request,response,next) => {
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
                            response.send(results);
                        } else {
                            //results is now undefined, it is an [] array so pass back a success empty msg
                            response.send(results);
                        }
                    });
                } else {
                    //If the stack is not initially in your collection
                    connection.query("SELECT `cards`.`card_id`, `cards`.`orig_source_stack` AS 'createdBy', `cards`.`question`,`cards`.`answer` , `stacks`.`stack_id`, `stacks`.`subject`, `stacks`.`category` FROM `cards` " +
                        "JOIN `stacks` ON `stacks`.`stack_id`= `cards`.`stack_id` " +
                        "WHERE `stacks`.`stack_id`=?;", [sid], (error, results) => {
                        if (error) {
                            response.send({success: false, message: "There was a problem with your request"});
                        }
                        console.log('stack 666 aint real');
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
//ADD CARD TO EXISTING STACK
//...this might need Authentication check, but technically you only ever get this request is isOwned = true from above...which will always be false if your token = guest
//and then the api/copy requires auth so it will already send a error response back if they arent validated
router.post('/:sID',(request,response,next)=>{
    let un = request.decoded.UserName;
    let stackID = request.params.sID;
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
//DELETE INDIVIDUAL card from your stack overview
router.delete('/:sID/:cID',(request,response,next)=>{
    let uid = request.decoded.UserID;
    if(request.params.cID) {
        let singleID = request.params.cID;
        let stackID = request.params.sID;
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
router.put('/:cId',(request,response,next)=>{
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
module.exports = router;
