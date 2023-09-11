// imports mysql
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'placeholder', //password here, usually you will cover this with a .env
    database: 'company_db', 
  });
  
  module.exports = connection;