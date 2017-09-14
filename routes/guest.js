const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//temporary fix...but the guest token should use a different token then the auth users
const config = require('../config/secret');

router.post('/',(req,res,next)=>{
    //this page will initiate a guest token on the home page if a token on the client side doesnt already exist
    //token has guest username, guest id, and guest privileges
    let token = jwt.sign({UserName:"guest", UserID:0, scope:1000 },config.secret,{
        expiresIn: 172800 //guest token is only good for 2 days
    });
    res.json({
        success: true,
        guestToken: true,
        token: token,
    });






});

module.exports = router;