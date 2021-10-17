// Include packages needed for this application
const inquirer = require("inquirer");

// Import the connection object
const db = require('./db/connection');

// Query database
db.query('SELECT * FROM course_names', function (err, results) {
    console.log(results);
  });

// //test that was able to connect
// sequelize.sync().then(() => {
//    sequelize.authenticate();console.log('Connection has been established successfully.');
//   });

