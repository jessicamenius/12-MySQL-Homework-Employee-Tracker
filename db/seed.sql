DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR (30) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR (80) NOT NULL,
	salary DECIMAL (10,2),
    department_id INT NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE employee(
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR (80) NOT NULL,
	last_name VARCHAR (80) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
	PRIMARY KEY(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);
