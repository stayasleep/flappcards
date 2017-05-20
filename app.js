const express = require('express');
const app = express();
const path = require('path');
const mysql=require('mysql');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 1337;

//routes
const users = require('./routes/users');

//HTTP Request for Dev
app.use(morgan('dev'));

//bodyParser Middleware
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({extended:true}));

//cors middleware for all pages
app.use(cors());

//static folder
app.use(express.static(path.join(__dirname,'client', 'dist')));

//handles when you head to home route and the other other pages
app.use('/users',users);

//maybe errors
// app.use(function(err,request,response,next){
//     console.error('err',err);
//     console.error('err2',err.stack);
//     response.status(500).send("Something broke!");
// });

//routes folder?
app.get('*',(req,res)=>{
    path.resolve(__dirname, 'client', 'dist', 'index.html');
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

//begin listening
app.listen(PORT, function(){
    console.log("Listening on PORT:", PORT);
});
