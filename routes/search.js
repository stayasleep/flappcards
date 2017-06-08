const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const pool = require('../config/config'); // connection credentials for database
const config = require('../config/secret'); // config for signature
const bcrypt = require('bcryptjs'); // bcrypt for Salt and Hash
const jwt = require('jsonwebtoken'); // JSON Web Token (jwt)

//SEARCH AUTOCOMPLETE DATA SOURCE
router.post('/autocomplete', (request, response, next)=> {
    pool.getConnection((error, connection) => {
        if (error) {
            response.json({
                success: false,
                message: "Problem populating the autocomplete data source"
            });
        }
        // Query the database to retrieve all available subject and categories
        connection.query("SELECT category, subject FROM `stacks`", (error, result) => {
            if (error) {
                // In case of error, it may be wise to send back an array of objects of sample searches.
                // Alexa style. Though I think something has gone seriously wrong if a SELECT category + subject query fails.
                // Front end's has a default value set, in case of emergency
                response.send({success: false, message: "Issue populating the auto complete"});
            } else {

                // Front end needs an array of strings, so prepare the results of the query before sending the result.
                const suggestions = []; // strange that the map function works despite suggestions being passed into convertToArrayOfStrings
                // should really do the processing of results on the backend, but let's get this working first
                function convertToArrayOfStrings(object) {
                    suggestions.push(object.category);
                    suggestions.push(object.subject);
                }
                result.map(convertToArrayOfStrings); // ["JavaScript", "String Methods", ...]
                response.send(suggestions); // Sends an array of objects; ex.: [{"category":"JavaScript", "subject": "String Methods"}, ... ]
            }
        });
        connection.release(); // Release the connection
    });
});


//SEARCH,
router.post('/',(request,response,next)=>{
    let uid =request.decoded.UserID;

    //if there is no object in the body or an empty object
    if(Object.keys(request.body).length === 0 ) {
        return response.json({success:false, message:"Invalid Submission"})
    }
    //if subObj is undefined
    if (!request.body.query) {
        return response.json({success:false, message:"Invalid submission type"})
    }

    let fromSearch = request.body.query;
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
