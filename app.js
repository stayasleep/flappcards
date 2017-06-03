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
// app.use(morgan('dev'));

//bodyParser Middleware
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({extended:true}));
//cors middleware for all pages
app.use(cors());

//static folder
app.use(express.static(path.join(__dirname,'client', 'dist')));

//Retrieve file when requested on client side and send it
// app.get('*',(req,res)=>{
//     path.resolve(__dirname, 'client', 'dist', 'index.html');
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
// });

//restrict route by checking to see if local host
app.use((req,res,next)=>{
    let remote = req.ip || req.connection.remoteAddress;
    console.log('rem',remote);
    if ((remote ==='::1')||(remote === 'localhost')){
        return next();
    }else{
        res.status(404).send("Error, not authenticated");
    }
});
//Set up for our routes
app.use('/users', users);


//Retrieve file when requested on client side and send it
app.get('*',(req,res)=>{
    path.resolve(__dirname, 'client', 'dist', 'index.html');
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

//begin listening
app.listen(PORT, function(){
    console.log("Listening on PORT:", PORT);
});
