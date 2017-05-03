const express = require('express');
const router = express.Router();
const users = require('../user_data');

router.post('/login', (req,res) => {
    let sentUsername = req.body.userName;
    let sentPassword = req.body.password;
    if (users[sentUsername] === undefined) {
        return res.send(false);
    } else {
        //TODO better error handling than just returning false if undefined
        if (sentPassword === users[sentUsername].user_pw) {
            return res.send(true);
        } else {
            return res.send(false);
        }
    }
});

module.exports = router;