const express = require('express');
const app = express();
const path = require('path');
const mysql=require('mysql');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 1337;

//routes
// const users = require('./routes/users');
const api = require('./routes/index');

//HTTP Request for Dev
// app.use(morgan('dev'));

//bodyParser Middleware
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({extended:true}));
//cors middleware for all pages
app.use(cors());

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
