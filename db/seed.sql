INSERT INTO department (name)
VALUES("Engineering"), ("Sales"), ("Finance");
       
INSERT INTO role(title, salary, department_id)
VALUES('Engineer', 85000, 1), ("Senior Engineer", 125000, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Testy', 'Test', 1, 2), ('Justin', 'Fields', 1, null);