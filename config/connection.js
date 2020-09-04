const mysql = require("mysql");
const env = require("dotenv").config();
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.SECRET,
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("we have been connected");
});

connection.query = util.promisify(connection.query);

module.exports = connection;
