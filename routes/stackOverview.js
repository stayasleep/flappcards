const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature

// Associated Axios call: getStack;
router.get('/:sID',(request,response,next) => {
    let uid = request.decoded.UserID;

    if(request.params.sID) {
        let sid = request.params.sID;
        pool.getConnection((error, connection) => {
            if (error) {
                console.log("Error connecting to db", error);
                response.json({
                    success: false,
                    message: "Problem Connecting to DB"
                });
            }
            connection.query("SELECT `stacks`.`stack_id`, `stacks`.`user_id` FROM `stacks` WHERE stacks.stack_id=?;", [sid], (error, result) => {
                if (error) {
                    response.send({success: false, message: "There was a problem with your request"});
                }

                if (result.length > 0) {

                    let owned = false;
                    if(result[0].user_id === uid){
                        owned = true;
                    }
                    connection.query(
                        "BEGIN;" +
                        "UPDATE `stacks` SET `rating` = (`rating`  + 1) WHERE `stack_id` = ?;" +
                        "SELECT `cards`.`card_id`, `cards`.`orig_source_stack` AS 'createdBy', `cards`.`question`,`cards`.`answer` , `stacks`.`stack_id`, `stacks`.`subject`, `stacks`.`category`, `stacks`.`copied_stack` AS `origin` FROM `cards` " +
                        "JOIN `stacks` ON `stacks`.`stack_id`= `cards`.`stack_id` " +
                        "WHERE `stacks`.`stack_id`=?;" +
                        "COMMIT;", [sid, sid], (error, results) => {
                        if (error) {
                            response.send({success: false, message: "There was a problem with your request"});
                        }
                        if (results[2].length > 0 && owned) {
                            results[2][0].isOwned = true;
                            response.send(results[2]);
                        } else {
                            //results is now undefined, it is an [] array so pass back a success empty msg
                            //the above does not make sense
                            response.send(results[2]);
                        }
                    });
                } else {
                    //stack doesnt exist at all, we want to render a component that says Does Not Exist
                    response.send({success: true, unavailable: true});
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
            }

            connection.query(
                "BEGIN;" +
                "DELETE `cards` FROM `cards` JOIN `stacks` ON `cards`.`stack_id` = `stacks`.`stack_id` WHERE `stacks`.`user_id` = ? AND `cards`.`card_id` = ?;" +
                "SELECT COUNT(`cards`.`card_id`) AS `remaining` FROM `cards` WHERE `cards`.`stack_id` = ? ;" +
                "COMMIT;",[uid, singleID, stackID], (error, result)=>{
                    if (error) {
                        response.send({success: false, message: "There was a problem with your request"});
                    }
                    const remaining = result[2][0].remaining;
                    let option = false;
                    if(remaining === 0){
                        option = true;
                    }
                    response.json({success: true, redirect: option });
                }
            );
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

router.put("/:stackID/headers", (req, res,next) => {
    let stackID = req.params.stackID;
    let userID = req.decoded.UserID;
    let newSub = req.body.subject;
    let newCat = req.body.category;

    if(Object.keys(req.body).length === 0){
        return res.json({success: false, message:"Subject and Category may not be blank"});
    }

    pool.getConnection((error, connection) =>{
        if(error){
            res.json({success: false, message: "Problem Connecting to DB"});
        }
        connection.query("UPDATE `stacks` SET `subject` = ?, `category` = ? WHERE `stack_id` = ? AND `user_id` = ?",[newSub, newCat, stackID, userID], (error, results) =>{
            if(error){
                return res.json({success: false, message:"There was a problem with your request"});
            }

            if(results.affectedRows === 1){

                connection.query("SELECT `subject`, `category` FROM `stacks` WHERE `stack_id` = ?;", [stackID],(error, results) => {
                    if(error){
                        return res.json({success:false, message: "There was a problem with your request"});
                    }
                    if(results.length === 1){
                        res.json({success:true, results: results});
                    }else{
                        res.json({success:false, message:"Cannot fetch stack headers"});
                    }
                });

            } else {
                res.json({success: false, message:"Stack does not exist!"});
            }
        });
        connection.release();
    })
});

module.exports = router;
