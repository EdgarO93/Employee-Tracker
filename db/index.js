// //will have to create classes here

// class Employee {
//     constructor (name, id, email) {
//         this.name = name;
//         this.id = id;
//         this.email = email;
//     }
//     getName() {
//         return this.name;
//     }
//     getId() {
//         return this.id;
//     }
//     getEmail() {
//         return this.email;
//     }
//     getRole() {
//         return "Employee";
//     }
// }

// class Manager extends Employee {
//     constructor(name,id,email,officeNumber){
//         super(name,id,email)
//         this.officeNumber = officeNumber;
//     }
//     getOfficeNumber(){
//         return this.officeNumber

//     };
//     getRole() {
//         return "Manager"
//     }
// }

// module.exports=  Manager;




// module.exports = Employee;

const db = require('./db/connection');


module.exports = {
    addNewEmployee,addNewRole,addNewDept,removeEmployee,removeDept,
    updateEmployeeRole,viewRoles,viewDepartments
 }