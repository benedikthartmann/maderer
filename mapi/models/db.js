'user strict';

var mysql = require('mysql');
require('dotenv').config()

//local mysql db connection
if (process.env.DB_HOST) {
  var connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
  });
} else {
  var connection = mysql.createConnection({
      socketPath: '/cloudsql/'+process.env.CLOUD_SQL_CONNECTION_NAME,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
  });
}

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
