'user strict';

var mysql = require('mysql');
require('dotenv').config()

//local mysql db connection
if (process.env.DB_HOST) {
  var connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_DATABASE,
  });
} else {
  var connection = mysql.createConnection({
      socketPath: '/cloudsql'+CLOUD_SQL_CONNECTION_NAME,    
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_DATABASE,
  });
}

console.log("DBuser:"+process.env.DB_USER);

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
