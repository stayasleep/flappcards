const express =require('express');
const router = express.Router();
const mysql = require('mysql');
const pool = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/helena');
const communications = require('../server/communications');
const nodemailer = require('nodemailer');

router.use('/:token',(req,res,next)=>{
    //we begin by checking that the link they clicked hasnt expired yet
    //since this route has a shorter exp and a new secret, it will have sep middleware
    const token = req.params.token;
    if(token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({success: false, message: "Failed to authenticate."});
            } else {
                //token is good, it should show the new pw confirmation page
                //render route or something?
                req.decoded = decoded;
                next();
                // res.json({success:true, message:"Continue"});

            }
        })
    }else{
        res.redirect('/404');
    }
});
//this should check that if you click the link, the token is valid and page renders
//this ensures check occurs before clicking submit new PW
router.get('/:token',(req,res)=>{
    res.json({success: true, message:"it worked!"});
});
//Page renders, new pw is entered and user hits submit
router.post('/:token',(req,res,next)=>{
    //we should check to see if the token is still valid, on the chance that
    //the browser stayed open but had 0 activity, we check the exp
    let checkExp = req.decoded.exp;
    console.log('decode nuts',req.decoded);
    let timeNow = Math.floor(Date.now()/1000);
    if(!(checkExp >=timeNow)){
        //token has expired so they should get an error message and then be redirected to landing page
        return res.json({success:false, message:"Token is no longer valid. Please try your request again"});
    }
    let checkToken = req.params.token;
    let un = req.decoded.UserName;
    let uEmail  = req.decoded.UserEmail;
    let newPw = req.body.resetPw;
    if (newPw && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/i.test(newPw)) {
        return res.json({success: false, error: "Error.  Passwords must contain at least 6 characters and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character."});
    }
    console.log('un',un);
    console.log('tok',checkToken);
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
                                    communications.mailOptions.html = "<h1>Hello "+un+",</h1>\n"+
                                            "<p>This is a confirmation that the password for your account on "+req.headers.host+" has successfully changed.</p>\n"+
                                            "<p>If you requested this action, great, it was successful.</p>\n"+
                                                "<p>But if you didn&apos;t request this action, you should contact us immediately.</p>\n"+
                                            "<em>Thanks,</em>\n"+
                                                "<p>The FlappCards Team</p>";
                                    transporter.sendMail(communications.mailOptions,(err,info)=>{
                                        if(err){
                                            return res.json({success:false, message:"There was a problem with the delivery. Please try again later"});
                                        }
                                        console.log('log this mail',info);
                                    });
                                    res.redirect('/');
                                    //res.json({success:true, message:'we did it'})
                                }
                            }
                        )
                    })
                })
            }else{
                //attempt query but there is no match
                res.json({success: false, message:"Unable to perform request, no match found."})
            }
        })
    })
});

module.exports = router;