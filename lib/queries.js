// imports connection.js
const connection = require('./connection');

class Queries {
    // view departments/roles/employees
    viewAllDepartments() {
        const query = 'SELECT id, name FROM department';
        return connection.promise().query(query)
        .catch((error) => {
            throw error;
        });
    }

    viewAllRoles() {
        const query = `
            SELECT role.id, role.title, role.salary, department.name AS department
            FROM role
            LEFT JOIN department ON role.department_id = department.id
        `;
        return connection.promise().query(query)
        .catch((error) => {
            throw error;
        });
    }

    viewAllEmployees() {
        const query = `
            SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title,
              department.name AS department, role.salary, manager.first_name AS manager_first_name,
              manager.last_name AS manager_last_name
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id
        `;
        return connection.promise().query(query)
        .catch((error) => {
            throw error;
        });
    }

    addDepartment(name) {
        const query = 'INSERT INTO department (name) VALUES (?)';
        return connection.promise().query(query, [name])
        .catch((error) => {
            throw error;
        });
    }

    addRole(title, salary, departmentId) {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        return connection.promise().query(query, [title, salary, departmentId])
            .catch((error) => {
            throw error;
        });
    }

    addEmployee(firstName, lastName, roleId, managerId) {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        return connection.promise().query(query, [firstName, lastName, roleId, managerId])
            .catch((error) => {
                throw error;
            });
    }
    

    updateEmployeeRole(firstName, lastName, roleId) {
        const query = 'UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?';
        return connection.promise().query(query, [roleId, firstName, lastName])
            .catch((error) => {
                throw error;
            });
    }
}

module.exports = new Queries();