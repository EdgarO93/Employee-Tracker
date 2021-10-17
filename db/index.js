const db = require('./connection');
const inquirer = require("inquirer");
const cTable = require('console.table');


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
                console.log(`Employee ${first_name} ${last_name} with was added`);
             
            }
        })
    })
}


// addNewRole
// addNewDept
// removeEmployee
// removeDept
// updateEmployeeRole
// viewRoles
// viewDepartments


//exporting functions to used in other index file
module.exports = {
                addNewEmployee,
                //  addNewRole, addNewDept, removeEmployee, removeDept,
                // updateEmployeeRole, viewRoles, viewDepartments
            }