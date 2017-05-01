const express = require('express');
const app = express();
const path = require('path');
const mysql=require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');


//routes
const users = require('./routes/users');

//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//cors middleware for all pages
app.use(cors());

//static folder
app.use(express.static(path.join(__dirname,'public')));


//handles when you head to home route and the other other pages
const routes = require('./routes/index');
// app.use('/',routes);
app.use('/users',users);

//index route
app.get('/',(request,response)=>{
    response.send('Invalid Endpoint');
});

//begin listening
app.listen(1337, function(){
    console.log('Listening to sw33t 1337 radio');
});


//routes folder?
// app.get('*',(req,res)=>{
//     res.sendFile((path.resolve(__dirname,'public','index.html')))
// })