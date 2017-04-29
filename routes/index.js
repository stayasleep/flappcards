const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/',function(request,response){
    response.sendFile(path.join(__dirname+'../skeleton_html/login.html'));
});

module.exports = router;
