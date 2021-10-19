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


// function to add new role
function addNewRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: "title",
                message: 'What is the role you want to add?',
            },
            {
                type: 'input',
                name: "salary",
                message: 'What is the salary for this role?',
            },
            {
                type: 'input',
                name: "department_id",
                message: 'What is the deparment ID this role belongs to?',
            },
        ])
    .then(function(res) {
        const title = res.title;
        console.log(res);
        const salary = res.salary;
        const department_id = res.department_id;
        const sql = `INSERT INTO role SET ?`
        console.log(salary);
        db.query(sql, {title:res.title, salary:res.salary, department_id:res.department_id}, function (err, res) {
            if (err) {
                console.log(err)
            } else {
                var action=`The role was added!`
                Menu(action);
            }
        }); 
    })
  };


// Add department
function addNewDept() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: "department_name",
                message: 'What is the name of the department you want to add?',
            }
        ])
    .then(function(res) {
        const department_name = res.department_name;
        console.log(res);
        const sql = `INSERT INTO department SET ?` 
        db.query(sql, {department_name:res.department_name}, function (err, res) {
            if (err) {
                console.log(err)
            } else {
                var action=`${department_name} was added`;
                Menu(action)
            }
        }); 
    })
  };
// removeEmployee-last
// removeDept- last


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
        const sql = `UPDATE employee SET ? WHERE id = ${employee_id}`
        db.query(sql, {role_id:res.role_id}, function (err, res) {
            if (err) {
                console.log(err)
            } else {
                var action=`The role was edited!`
                Menu(action)
            }
        }); 
    })
};
// to see all employees
function viewEmployees() {
    const sql = `SELECT 
        employee.id,
        employee.first_name, 
        employee.last_name, 
        role.title, 
        role.salary,
        department.department_name,
        concat(manager.first_name, " ", manager.last_name) AS manager_full_name
        FROM employee 
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON department.id = role.department_id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`;
  
    // console.log(sql);
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table (rows);
        let action= "Above is all the employees table."
        Menu(action);
    });
  };

  // View departments
function viewDepartments() {
    const sql = `SELECT * FROM department`;
    // console.log(sql);
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table (rows);
        let action= "Above is all the departments table."
        Menu(action);
    });
  };
  
  // View roles
  function viewRoles() {
    const sql = `SELECT * FROM role`;
    // console.log(sql);
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table (rows);
        let action= "Above is all the roles table."
        Menu(action);
    });
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
          case 'Remove Employee':
            removeEmployee();
            break;
        //   case 'Remove Role':
        //     removeRole();
        //     break;
        //   case 'Remove Department':
        //     removeDept();
        //     break;
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
                addNewEmployee,updateEmployeeRole,addNewRole, addNewDept,viewEmployees,viewRoles, viewDepartments
                //removeEmployee, removeDept,
           
            }