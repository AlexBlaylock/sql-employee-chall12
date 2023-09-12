DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;
USE company_db;
-- dept table
DROP TABLE IF EXISTS department;
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- role table
DROP TABLE IF EXISTS role;
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
--   (8, 2) means i can have 8 digits to the left of the decimal, 2 to the right.
  salary DECIMAL(8) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- employee table
DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);
