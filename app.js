const express = require('express');
const app = express();
const mysql=require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//routes
// const routes = require('./routes/index');
const api = require('./routes/api');

//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());





//handles when you head to home route and the other other pages
// const routes = require('./skeleton_html/login.html')
// app.use('/',routes);
app.use('/api',api);

//begin listening
app.listen(1337, function(){
    console.log('Listening to sw33t 1337 radio');
});