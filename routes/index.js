const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/',function(request,response){
    response.sendFile(path.join(__dirname+'/../skeleton_html/login.html'));
});

router.get('/home',function(request,response){
    response.sendFile(path.join(__dirname+"/../skeleton_html/home.html"));
});

module.exports = router;
