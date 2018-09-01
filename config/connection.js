//create connection with mysql database
var mysql = require('mysql');

// set any environment variables with dotenv package
require("dotenv").config();

// define database connection properties
if (process.env.JAWSDB_URL) {
    //Heroku deployment
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: process.env.MYSQL_PASSWORD,
        database: "burgar_db"
    })
}

connection.connect(function (err) { 
    if (err) {
        console.log("error connecting: " + connection.threadId);
        return;
    }
    console.log("connected as id " + connection.threadId)
 });

 //export the connection properties
 module.exports = connection;