const db = require('./connection');
const inquirer = require("inquirer");
const cTable = require('console.table');
// const startMenu = require ('../index')

//function to add new employee
addNewEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of employee?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name name of employee?',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Please enter the role id of the new employee:',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Please enter the manager id of the new employee:',
        },
        //uses values to run SQL query
    ]).then(function (res) {
        const first_name = res.first_name;
        console.log(res);
        const last_name = res.last_name;
        const role_id = res.role_id;
        const sql = `INSERT INTO employee SET ?`
        db.query(sql, { first_name: res.first_name, last_name: res.last_name, role_id: res.role_id, manager_id: res.manager_id }, function (err, res) {
            if (err) {
                console.log(err)
            } else {
                var action=`Employee ${first_name} ${last_name} with was added!`
                Menu(action);
            }// runs prompt to return to menu or stop
            // inquirer.prompt([
            //     {
            //         type: "list",
            //         name: "addMembers",
            //         message: "Would you like to add another employee?",
            //         choices: ["yes", "no"],
            //     },
            // ]) .then(function ({addMembers }) {
            //     if (addMembers === "yes") {
            //         startMenu();
            //     } else {
            //         console.log ('Thank you for using!')
            //     }
            // })
        })
    })
}


// addNewRole
// addNewDept
// removeEmployee-last
// removeDept- last
// viewRoles
// viewDepartments

// Update an employee's role
function updateEmployeeRole() {
    inquirer
        .prompt([
            {   type: 'number',
                name: "employee_id",
                message: 'What is the employee ID you want to update?',
            },
            {
                type: 'number',
                name: "role_id",
                message: 'What is the new role ID of this employee?',
          
            }
        ])
    .then(function(res) {
        const employee_id = res.employee_id;
        console.log(res);
        const role_id = res.role_id;
        const sql = `UPDATE employees SET ? WHERE id = ${employee_id}`
        db.query(sql, {role_id:res.role_id}, function (err, res) {
            if (err) {
                console.log(err)
            } else {
                console.log(`The e was edited`);
                Menu()
            }
        }); 
    })
};




//reference for menu to start over
function Menu (action) {
    let act= action;
    inquirer
      .prompt([
        {
          // list of queries
          type: 'list',
          name: 'selection',
          message:  `${act} What do you want to do next?`,
          choices: [
            'View All Employees',
            'View All Roles',
            'View All Departments',
            'Add an Employee',
            'Add a Role',
            'Add a Department',
            'Update an Employee Role',
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
          case 'Add an Employee':
            addNewEmployee();
            break;
          case 'Add a Role':
            addNewRole();
            break;
          case 'Add a Department':
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

//exporting functions to used in other index file
module.exports = {
                addNewEmployee,
                //  addNewRole, addNewDept, removeEmployee, removeDept,
                // updateEmployeeRole, viewRoles, viewDepartments
            }