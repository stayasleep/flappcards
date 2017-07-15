const express = require('express');
const app = express();
const path = require('path');
const mysql=require('mysql');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 1337;
const jwt = require('jsonwebtoken');
const config = require('./config/secret');

//routes
const api = require('./routes/index');

//HTTP Request for Dev
// app.use(morgan('dev'));

//bodyParser Middleware
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({extended:true}));
//cors middleware for all pages
app.use(cors());
//middleware for all
// app.use((req,res,next)=>{
//     if(typeof Storage !=="undefined"){
//         if(localStorage.getItem("token")===null){
//             console.log('it doesnt exist yet');
//             let token1= {"he":"ho"};
//             // req.token = token1;
//             next();
//         }else{
//             console.log("it exists");
//             next();
//         }
//     }
// });
//
// app.use(function(req,res,next){
//     //check to see if req.body is {} if it is thats bc there isnt a token
//     if(Object.keys(req.body).length===0){
//         let token = jwt.sign({UserName:"guest", UserID: 0},config.secret,{
//             expiresIn: 604800
//         });
//         req.body.token = token;
//         console.log('made it', req.body.token);
//         next();
//     }else{
//         //token already exists
//         next();
//     }
// });

//static folder
app.use(express.static(path.join(__dirname,'client', 'dist')));

//Set up for our routes
app.use('/api',api);

//Retrieve file when requested on client side and send it
app.get('*',(req,res)=>{
    path.resolve(__dirname, 'client', 'dist', 'index.html');
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

//begin listening
app.listen(PORT, function(){
    console.log("Listening on PORT:", PORT);
});
