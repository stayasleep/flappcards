const express =require('express');
const router = express.Router();
const mysql = require('mysql');
const pool = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/helena');
const communications = require('../server/communications');
const nodemailer = require('nodemailer');
const template = require('../server/layout/resetTemplate');
const templateText = require('../server/layout/resetTemplateText');

router.use('/:token',(req,res,next)=>{
    const token = req.headers['x-access-token'] || req.body.token;
    if(token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                //token is invalid or expired or fake
                console.log('route is old');
                return res.json({success:false});
                // return res.redirect('/404');
            } else {
                console.log('reset route next');
                req.decoded = decoded;
                next();
                // res.json({success:true, message:"Continue"});
            }
        })
    }else{
        console.log('404');
        return res.redirect('/404');
    }
});
//this should check that if you click the link, the token is valid and page renders
router.get('/:token',(req,res)=>{
    console.log('arrived at reset router get');
    res.json({success: true, message:"it worked!"});
});

//Page renders, new pw is entered and user hits submit
router.post('/:token',(req,res,next)=>{
    //we should check to see if the token is still valid, on the chance that
    //the browser stayed open but had 0 activity, we check the exp
    let checkExp = req.decoded.exp;
    let timeNow = Math.floor(Date.now()/1000);
    if(!(checkExp >=timeNow)){
        //token has expired so they should get an error message and then be redirected to landing page
        return res.json({success:false, message:"Token is no longer valid. Please try your request again"});
    }
    let checkToken = req.params.token;
    let un = req.decoded.UserName;
    let uEmail  = req.decoded.UserEmail;
    let passwordConf = req.body.passwordConfirm;
    let newPw = req.body.resetPw;
    if (newPw && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/i.test(newPw)) {
        // return res.json({success: false, error: "Error.  Passwords must contain at least 6 characters and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character."});
        return res.json({success: false, resetPassword: true});
    }
    if (newPw && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/i.test(newPw)) {
        return res.json({success: false, resetPassword: true});    }
    if(newPw && !/^(?=.*[a-z])/i.test(newPw)){
        return res.json({success: false, resetPassword: true});    }
    if(newPw && !/^(?=.*[A-Z])/i.test(newPw)){
        return res.json({success: false, resetPassword: true});    }
    if(newPw && !/^(?=.*[0-9])/i.test(newPw)){
        return res.json({success: false, resetPassword: true});    }
    if(newPw && !/^(?=.*[!@#\$%\^&\*])/i.test(newPw)){
        return res.json({success: false, resetPassword: true});    }
    if (newPw !== passwordConf) {
        return res.json({success: false, resetPassword: true});    }

    //token is still good to use lets check with the db to make sure it is the right user
    pool.getConnection((err,connection)=>{
        if (err){
            return res.json({success:false, message:"There was a problem connecting to the db."});
        }
        connection.query("SELECT username, reset_token FROM `users` WHERE `reset_token`=? AND username =?;",[checkToken,un],(err,results)=>{
            if(err){
                res.json({success: false, message:"There was a problem with your request"});
            }else if(results.length === 1){
                //hash the new pw
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newPw, salt,(err,hash)=>{
                        newPw = hash;
                        connection.query(
                            "UPDATE `users` SET `reset_token`= ?, user_pw = ? WHERE `username`=?;",[null,newPw,un],(err,results)=>{
                                if(err){
                                    return res.json({success:false, message:"There was a problem with your request"});
                                }else{
                                    //rows affected should be 1 since we already confirmed user and token exist- so we proceed
                                    //success, pw updated, reset_t is reset,
                                    //send a confirm email pw has been reset
                                    //redirect to log in page or landing page? Invalidate old token
                                    //if they get sent to log in, the token is never used again: do nada
                                    //if they get sent to /home then they need a token sent to them
                                    let transporter = nodemailer.createTransport(communications.credentials);
                                    transporter.verify((err,success)=>{
                                        if(err){
                                            console.log(err);
                                        }else{
                                            console.log("Server is ready to take our messages");
                                        }
                                    });
                                    communications.mailOptions.to = uEmail;
                                    communications.mailOptions.subject = "Alert: Your Password Has Been Reset";
                                    communications.mailOptions.html = template(req);
                                    communications.mailOptions.text = templateText(req);

                                    transporter.sendMail(communications.mailOptions,(err,info)=>{
                                        if(err){
                                            return res.json({success:false, message:"There was a problem with the delivery. Please try again later"});
                                        }
                                        console.log('log this mail',info);
                                    });
                                    res.json({success:true, message:'Congrats.  Password has been reset.  You will be redirected to the login page.'});
                                }
                            }
                        )
                    })
                })
            }else{
                //attempt query but there is no match bc token expired or maybe db column doesnt match token sent to us
                // res.json({success: false, message:"Unable to perform request, no match found."})
                res.json({success:false, resetPassword: true});
            }
        })
    })
});

module.exports = router;