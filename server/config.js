const mysql = require('mysql');
const connection = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'root',
    database: 'c217_fc'
});

module.exports = connection;