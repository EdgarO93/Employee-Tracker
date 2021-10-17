// Include packages needed for this application
const inquirer = require("inquirer");

// Import the connection object
const sequelize = require('./db/connection');


//test that was able to connect
sequelize.sync().then(() => {
   sequelize.authenticate();console.log('Connection has been established successfully.');
  });

