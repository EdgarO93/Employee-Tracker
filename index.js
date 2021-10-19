// Include packages needed for this application
const inquirer = require("inquirer");
const cTable = require('console.table');


// Import the connection object
const db = require('./db/connection');
//might use to import functions
const{ addNewEmployee,addNewRole,addNewDept,viewEmployees,removeEmployee,removeDept,
  updateEmployeeRole,viewRoles,viewDepartments} = require('./db/index');


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
          'View All Roles',
          'View All Departments',
          'Add an Employee',
          'Add a Role',
          'Add a Department',
          'Update an Employee Role',
          // 'Remove Employee',
          // 'Remove Role',
          // 'Remove Department',
          'Exit Program',
        ],
      },
    ])
    ///will connect each prompt to the function
    .then((data) => {
      switch (data.selection) {
        case 'Add an Employee':
          addNewEmployee();
          break;
        case 'Add a Role':
          addNewRole();
          break;
        case 'Add a Department':
          addNewDept();
          break;
        // case 'Remove Employee':
        //   removeEmployee();
        //   break;
        // case 'Remove Role':
        //   removeRole();
        //   break;
        // case 'Remove Department':
        //   removeDept();
        //   break;
        case 'Update an Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Employees':
          viewEmployees();
          break;
        case 'View All Roles':
          viewRoles();
          break;
        case 'View All Departments':
          viewDepartments();
          break;
        default:
          console.log ('Thank you for using!')
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


