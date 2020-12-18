
const mysql = require("mysql");

const config = require("./database.json")
console.log("connection is called.. ---------------------------")

const connection = mysql.createConnection( config );
connection.connect();

module.exports = connection;