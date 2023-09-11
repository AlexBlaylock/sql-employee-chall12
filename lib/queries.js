// imports connection.js
const connection = require('../lib/connection');

class Queries {

    // view departments
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


}