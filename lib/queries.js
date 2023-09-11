// imports connection.js
const connection = require('../lib/connection');

class Queries {

    // view departments/roles/employees
    async viewAllDepartments() {
        try {
          const query = 'SELECT id, name FROM department';
          const results = await connection.query(query);
          return results;
        } catch (error) {
          throw error;
        }
      }

    async viewAllRoles() {
        try {
          const query = `
            SELECT role.id, role.title, role.salary, department.name AS department
            FROM role
            LEFT JOIN department ON role.department_id = department.id
            `;
          const results = await connection.query(query);
          return results;
        } catch (error) {
          throw error;
        }
      }

    async viewAllEmployees() {
        try {
          const query = `
            SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title,
              department.name AS department, role.salary, manager.first_name AS manager_first_name,
              manager.last_name AS manager_last_name
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id
          `;
          const results = await connection.query(query);
          return results;
        } catch (error) {
          throw error;
        }
      }

    //   left join is used to join 2 tables together, like linking employees to roles.

    async addDepartment(name) {
        try {
          const query = 'INSERT INTO department (name) VALUES (?)';
          const results = await connection.query(query, [name]);
          return results;
        } catch (error) {
          throw error;
        }
      }

    async addRole(title, salary, departmentId) {
        try {
          const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
          const results = await connection.query(query, [title, salary, departmentId]);
          return results;
        } catch (error) {
          throw error;
        }
      }  
}