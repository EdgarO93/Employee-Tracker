const db = require('./connection');
const inquirer = require("inquirer");
const cTable = require('console.table');


//function to add new employee
addNewEmployee = () => {
    //newEmployee object for prompt answers
    const newEmployee = {
        firstName: "",
        lastName: "",
        roleID: 0,
        managerID: 0
    };
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
    ]).then(res => {
        //set newEmployee name
        newEmployee.firstName = res.first_name;
        newEmployee.lastName = res.last_name;
        //sql query for roles
        const query = `SELECT role.title, role.id FROM role;`;
        db.query(query, (err, res) => {
            if (err) throw err;
            //grab  and add role names and ids to arrays
            const roles = [];
            const rolesNames = [];
            for (let i = 0; i < res.length; i++) {
                roles.push({
                    id: res[i].id,
                    title: res[i].title
                });
                rolesNames.push(res[i].title);
            } inquirer.prompt([

                {
                    type: 'list',
                    name: 'roles',
                    message: 'Please select role:',
                    choices: rolesNames
                }]).then(answer => {
                    //get id of  role picked
                    const resRole = answer.roles;
                    let resRoleID;
                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].title === resRole) {
                            resRoleID = roles[i].id;
                        }
                    }
                    //set newEmployee role ID 
                    newEmployee.roleID = resRoleID;
                    //query for managers information
                    const query = `
            SELECT DISTINCT concat(IFNULL(manager.first_name, 'None'), " ", IFNULL(manager.last_name,'None')) AS full_name, manager.id
            FROM employee 
            LEFT JOIN employee AS manager ON manager.id = employee.manager_id;`;
                    db.query(query, (err, res) => {
                        if (err) throw err;
                        //getting manager names and ids to arrays
                        const managers = [];
                        const managersNames = [];
                        for (let i = 0; i < res.length; i++) {
                            managersNames.push(res[i].full_name);
                            managers.push({
                                id: res[i].id,
                                fullName: res[i].full_name
                            });
                        }

                        inquirer
                            .prompt([{
                                type: 'list',
                                name: 'managerPck',
                                message: 'Select Manager:',
                                choices: managersNames

                            },

                            ]).then(function (res) {
                                //get id of chosen manager
                                const chosenManager = answer.managerPck;
                                let chosenManagerID;
                                for (let i = 0; i < managers.length; i++) {
                                    if (managers[i].fullName === chosenManager) {
                                        chosenManagerID = managers[i].id;
                                        break;
                                    }
                                }//query to insert employee
                                const query = "INSERT INTO employee SET ?";
                                db.query(query, {
                                    first_name: newEmployee.firstName,
                                    last_name: newEmployee.lastName,
                                    role_id: newEmployee.roleID || 0,
                                    manager_id: newEmployee.managerID || 0
                                }, function (err, res) {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        var action = `Employee ${newEmployee.firstName} ${newEmployee.lastName} with was added!`
                                        Menu(action);
                                    }

                                })
                            })
                    })
                })
        })
    })
}


// function to add new role
function addNewRole() {
    //array to for prompt choices
    const departments = [];
    const departmentsName = [];
    //sql query to fill in array
    const query = `SELECT id, department_name FROM department`;
    db.query(query, (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            departments.push({
                id: res[i].id,
                name: res[i].department_name
            });
            departmentsName.push(res[i].department_name);
        }
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
                    type: 'list',
                    name: "department_name",
                    message: 'Pick Department that this role belongs to:',
                    choices: departmentsName
                },
            ])
            .then(function (res) {
                const title = res.title;
                console.log(res);
                const salary = res.salary;
                //grabs ID from the department name that matches the one selected
                let deptID = departments.find((obj) => obj.name === res.department_name).id;
                // console.log(deptID);
                // const department_name = res.department_name;
                const sql = `INSERT INTO role SET ?`
                // console.log(salary);
                db.query(sql, { title: res.title, salary: res.salary, department_id: deptID }, function (err, res) {
                    if (err) {
                        throw err;
                        // console.log(err)
                    } else {
                        var action = `The role was added!`
                        Menu(action);
                    }
                });
            })
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
        .then(function (res) {
            const department_name = res.department_name;
            console.log(res);
            const sql = `INSERT INTO department SET ?`
            db.query(sql, { department_name: res.department_name }, function (err, res) {
                if (err) {
                    console.log(err)
                } else {
                    var action = `${department_name} was added!`;
                    Menu(action)
                }
            });
        })
};
// removeEmployee- later
// removeDept- later


// Update an employee's role
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'number',
                name: "employee_id",
                message: 'What is the employee ID you want to update?',
            },
            {
                type: 'number',
                name: "role_id",
                message: 'What is the new role ID of this employee?',

            }
        ])
        .then(function (res) {
            const employee_id = res.employee_id;
            console.log(res);
            const role_id = res.role_id;
            const sql = `UPDATE employee SET ? WHERE id = ${employee_id}`
            db.query(sql, { role_id: res.role_id }, function (err, res) {
                if (err) {
                    console.log(err)
                } else {
                    var action = `The role was edited!`
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
        concat(IFNULL (manager.first_name, "NONE"), " ", IFNULL (manager.last_name,'NONE')) AS manager_full_name
        FROM employee 
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON department.id = role.department_id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`;

    // console.log(sql);
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows);
        let action = "Above is all the employees table."
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
        console.table(rows);
        let action = "Above is all the departments table."
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
        console.table(rows);
        let action = "Above is all the roles table."
        Menu(action);
    });
};


//reference for menu to start over
function Menu(action) {
    let act = action;
    inquirer
        .prompt([
            {
                // list of queries
                type: 'list',
                name: 'selection',
                message: `${act} What do you want to do next?`,
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
                    console.log('Thank you for using!')
                    db.end();
            }
        });

};

//exporting functions to used in other index file
module.exports = {
    addNewEmployee, updateEmployeeRole, addNewRole, addNewDept, viewEmployees, viewRoles, viewDepartments
    //removeEmployee, removeDept,

}