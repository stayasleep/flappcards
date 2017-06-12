const express = require('express');
const router =express.Router();
const mysql = require('mysql');
const pool = require('../config/config'); // connection credentials for database
const path = require('path');
const mailer = require('../notifications/sysmail');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const special = require('../config/helena');

router.post('/',(req,res,next)=>{
    let un = req.body.userName;
    let uemail = req.body.userEmail;
    pool.getConnection((err,connection)=>{
        if(err){
            console.log("Error connecting to db: ",err);
            return res.json({success:false, message:"There was a problem connecting to the db"});
        }
        connection.query("SELECT `username`,`user_email` FROM `users` WHERE `username`=? AND `user_email`=? ;",[un,uemail],(err,results)=>{
            if(err){
                return res.json({success:false, message:'There was a problem with your request'});
            }else{
                if(results.length === 1){
                    console.log('res ',results);
                    // console.log('req',req);
                    // console.log('proto',req.protocol);
                    // console.log('host',req.hostname);
                    //results from db
                    let recoveryEmail = results[0].user_email;
                    let recoveryName = results[0].username;
                    //SHOULD GENERATE TOKEN HERE
                    let token = jwt.sign({UserName: recoveryName, UserEmail: recoveryEmail},special.secret,{
                        expiresIn: 14400 // expires 4hrs after generated
                    });
                    //set the token on the db as a preventative measure
                    connection.query(
                        "UPDATE `users` SET `reset_token` = ? WHERE `username` = ?;",[token,recoveryName],(err,results)=>{
                            if(err){
                                return res.send({success: false, message:"There was a problem with your request"});
                            }
                            //so there must be success
                            //transporter is an obj that is able to send mail, only need to create this one
                            let transporter = nodemailer.createTransport({
                                host:'smtp.gmail.com',  // Specify main and backup SMTP servers
                                port: 587,              // TCP port to connect to
                                secure: false,         // secure:true for port 465, secure:false for port 587
                                auth:{
                                    user: mailer.user,
                                    pass: mailer.pass
                                }
                            });
                            // verify connection configuration
                            transporter.verify(function(error, success) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Server is ready to take our messages');
                                }
                            });
                            //mail configuration
                            let mailOptions = {
                                from:'"FlappCard Support" <'+mailer.user+'>',  //us
                                to: "",                                    //response from db
                                subject:"Account Recovery",
                                text:"Your account reset recovery link is below",
                                html:"<b>Hello B!</b> Your account recovery link is <em>below</em>\n\n"+
                                req.protocol+"://"+req.hostname+"/reset/"+token

                            };
                            //combine mail content with transporter obj and send
                            transporter.sendMail(mailOptions,(err,info)=>{
                                if(err){
                                    return res.json({success:false, message:"There was a problem with the delivery. Please try again later."});
                                }
                                console.log('log this info',info);
                            });
                            return res.json({success:true, message:"An email has been sent to the provided email address, thank you."});

                        }
                    );
                    // //transporter is an obj that is able to send mail, only need to create this one
                    // let transporter = nodemailer.createTransport({
                    //     host:'smtp.gmail.com',  // Specify main and backup SMTP servers
                    //     port: 587,              // TCP port to connect to
                    //     secure: false,         // secure:true for port 465, secure:false for port 587
                    //     auth:{
                    //         user: mailer.user,
                    //         pass: mailer.pass
                    //     }
                    // });
                    // // verify connection configuration
                    // transporter.verify(function(error, success) {
                    //     if (error) {
                    //         console.log(error);
                    //     } else {
                    //         console.log('Server is ready to take our messages');
                    //     }
                    // });
                    // //mail configuration
                    // let mailOptions = {
                    //     from:'"FlappCard Support" <'+mailer.user+'>',  //us
                    //     to: "bernstein.brianj@gmail.com",                                    //response from db
                    //     subject:"Account Recovery",
                    //     text:"Your account reset recovery link is below",
                    //     html:"<b>Hello B!</b> Your account recovery link is <em>below</em>\n\n"+
                    //         req.protocol+"://"+req.hostname+"/reset/"+token
                    //
                    // };
                    // //combine mail content with transporter obj and send
                    // transporter.sendMail(mailOptions,(err,info)=>{
                    //     if(err){
                    //         return res.json({success:false, message:"There was a problem with the delivery. Please try again later."});
                    //     }
                    //     console.log('log this info',info);
                    // });
                    // res.json({success:true, message:"An email has been sent to the provided email address, thank you."});
                }else{
                    res.json({success:false, message:"Username/Email not found"});
                }
            }
        });
        connection.release();
    });
});

module.exports = router;