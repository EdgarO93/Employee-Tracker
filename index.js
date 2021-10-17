// Include packages needed for this application
const inquirer = require("inquirer");
const cTable = require('console.table');


// Import the connection object
const db = require('./db/connection');

// Query database
db.query('SELECT * FROM department', function (err, results) {
   if(err){console.log(err);} else{ console.log("test",results)};
  });


