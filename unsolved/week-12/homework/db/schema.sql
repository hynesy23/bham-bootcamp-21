DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    salary DECIMAL (8, 2),
    department_id INT NOT NULL,
    INDEX dep_ind (department_id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    INDEX dep_ind (role_id),
    FOREIGN KEY(role_id) REFERENCES role(id)
);