const express = require('express');
const mysql = require('mysql');
const router = express.Router();

//temporary, for now leave the db and connections on the same page
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'root',
    database:'c217_fc'
});
connection.connect();

router.

module.exports = router;