INSERT INTO department (department_name)
VALUES("Engineering"), ("Sales"), ("Finance"), ("Human Resources"), ("Communications");
       
INSERT INTO role(title, salary, department_id)
VALUES('Engineer', 85000, 1), ("Senior Engineer", 125000, 1),('Sales', 65000, 2), ("Sales Lead", 95000, 2),("Accountant", 70000,3), ("HR Lead", 70000,4),("Social Media Intern", 20000,5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Rusty', 'Testy', 1, 3), ('Andy','Dalton', 1, 3), ('Justin', 'Fields', 2, null), ('John', 'Smith', 4, null),('Joe','Greene',6, null);