const express =require('express');
const router = express.Router();
const mysql = require('mysql');
const pool = require('../config/config');


router.post('/:token',(res,req,next)=>{
    //this is where you take the token that comes in...decrypt the token
    //and from the token you pull off the id/username
    //when user clicks this link, the page they are taken to should allow them to type new pw and confirm pw
    //update db with this information
    let newPw = req.body.resetPw;
    let un = req.decoded.userName;
    pool.getConnection((err,connection)=>{
        if(err){
            return response.json({success:false, message:"There was a problem connecting to db."});
        }
        connection.query("UPDATE `users` SET `user_pw`=? WHERE `username` = ?;",[newPw,])
    })
});

module.exports = router;