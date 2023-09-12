// imports mysql
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '', //password here, usually you will cover this with a .env
    database: 'company_db', 
  });
  
  module.exports = connection;
