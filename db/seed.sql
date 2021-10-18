INSERT INTO department (department_name)
VALUES("Engineering"), ("Sales"), ("Finance");
       
INSERT INTO role(title, salary, department_id)
VALUES('Engineer', 85000, 1), ("Senior Engineer", 125000, 1),('Sales', 65000, 2), ("Sales Lead", 95000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Testy', 'Test', 1, 2), ('Justin', 'Fields', 1, null);