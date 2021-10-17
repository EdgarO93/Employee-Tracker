// Include packages needed for this application
const inquirer = require("inquirer");
const cTable = require('console.table');


// Import the connection object
const db = require('./db/connection');
//might use to import functions
const func = require('./db/index');

// Query database-test
// db.query('SELECT * FROM department', function (err, results) {
//    if(err){console.log(err);} else{ console.log("test",results)};
//   });

// function for the start menu to prompt user
function startMenu () {
  inquirer
    .prompt([
      {
        // list of queries
        type: 'list',
        name: 'selection',
        message: 'Welcome to the Employee Tracker. What do you want to do?',
        choices: [
          'View All Employees',
          'View Roles',
          'View Departments',
          'Add Employee',
          'Add Role',
          'Add Department',
          'Update Employee Role',
          'Remove Employee',
          'Remove Role',
          'Remove Department',
          'Exit Program',
        ],
      },
    ])
    ///will connect each prompt to the function
    .then((data) => {
      switch (data.selection) {
        case 'Add Employee':
          addNewEmployee();
          break;
        case 'Add Role':
          addNewRole();
          break;
        case 'Add Department':
          addNewDept();
          break;
        case 'Remove Employee':
          removeEmployee();
          break;
        case 'Remove Role':
          removeRole();
          break;
        case 'Remove Department':
          removeDept();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'View Roles':
          viewRoles();
          break;
        case 'View Departments':
          viewDepartments();
          break;
        default:
          db.end();
      }
    });
};


// A function to initialize app
function init() {
startMenu();
}


// Function call to initialize app
init();