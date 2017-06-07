const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)

//SEARCH,
router.post('/search',(request,response,next)=>{
    let uid =request.decoded.UserID;

    //if there is no object in the body or an empty object
    if(Object.keys(request.body).length === 0 ) {
        return response.json({success:false, message:"Invalid Submission"})
    }
    //if subObj is undefined
    if (!request.body.query) {
        return response.json({success:false, message:"Invalid submission type"})
    }
    //if search is empty
    if(!request.body.query.Search){
        return response.json({success:false, message:"Invalid submission type"})
    }
    let fromSearch = request.body.query.Search;
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
module.exports = router;
