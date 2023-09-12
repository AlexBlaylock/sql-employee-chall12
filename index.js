const inquirer = require('inquirer');
require('console.table'); //helps display my data as a table, https://developer.mozilla.org/en-US/docs/Web/API/console/table

// importing queries
const queries = require('./lib/queries');

function mainMenu() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'select',
            message: 'Select what you would want to do.',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                "Update an employee's role",
                'Exit Application',
            ],
        },
    ])
    
    .then(async (answer) => {
        switch(answer.select) {
            
            case 'View all departments':
                queries.viewAllDepartments()
                    .then((results) => {
                        const departmentData = results[0];
                        console.table(departmentData);
                        mainMenu();
                    })
                    .catch((error) => {
                        console.error('An error occurred:', error);
                        mainMenu();
                    });
            break;

            case 'View all roles':
                queries.viewAllRoles()
                    .then(([rows]) => {
                        console.table(rows);
                        mainMenu();
                    })
                    .catch((error) => {
                        console.error('An error occurred:', error);
                        mainMenu();
                        });
            break;
            
            case 'View all employees':
                queries.viewAllEmployees()
                    .then(([rows]) => {
                        console.table(rows);
                        mainMenu();
                    })
                    .catch((error) => {
                        console.error('An error occurred:', error);
                        mainMenu();
                    });
            break;

            // console.table shows objects in table format

            // add department, role, employee cases
            case 'Add a department':
                // add a inquirer prompt here so you can add department
                inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'newDepartment',
                        message: 'Enter a name for the new department:',
                    },
                ])
                .then(async (answers) => {
                    const { newDepartment } = answers;
                    await queries.addDepartment(newDepartment)
                        .then(() => {
                            console.log(`Department '${newDepartment}' added successfully.`);
                            mainMenu();
                        })
                        .catch((error) => {
                            console.error('An error occurred:', error);
                            mainMenu();
                        });
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                    mainMenu();
                });
                break;

            case 'Add a role':
                inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'roleTitle',
                        message: "Enter the new role's title",
                    },
                    {
                        type: 'input',
                        name: 'roleSalary',
                        message: "Enter the new role's salary",
                    },
                    {
                        type: 'input',
                        name: 'departmentId',
                        message: "Enter the new role's department ID",
                    },
                ])

                .then(async (answers) => {
                    const { roleTitle, roleSalary, departmentId } = answers;
                    await queries.addRole(roleTitle, roleSalary, departmentId); 
                    console.log(`Role '${roleTitle}' added successfully.`);
                    mainMenu(); 
                  })
                  .catch((error) => {
                    console.error('An error occurred:', error);
                    mainMenu(); 
                  });
                break;
            
            case 'Add an employee':
                inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: "Enter the new employee's first name:",
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: "Enter the new employee's last name:",
                    },
                    {
                        type: 'input',
                        name: 'roleId',
                        message: "Enter the new employee's role ID:",
                    },
                    {
                        type: 'input',
                        name: 'managerId',
                        message: 'Enter the manager ID for the new employee (leave empty for no manager):',
                    },
                ])
                
                .then(async (answers) => {
                    const { firstName, lastName, roleId, managerId } = answers;
                    const managerIdValue = managerId ? parseInt(managerId) : null; // Convert managerId to a number or set to null if empty
                    await queries.addEmployee(firstName, lastName, roleId, managerIdValue)
                        .then(() => {
                            console.log(`Employee '${firstName} ${lastName}' added successfully.`);
                            mainMenu();
                        })
                        .catch((error) => {
                                    console.error('An error occurred:', error);
                                    mainMenu();
                        });
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                    mainMenu();
                });
            break;

            case "Update an employee's role":
                inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: "Enter the new employee's first name:",
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: "Enter the new employee's last name:",
                    },
                    {
                        type: 'input',
                        name: 'roleId',
                        message: "Enter the employee's new role ID:",
                    },
                    {
                        type: 'input',
                        name: 'managerId',
                        message: 'Enter the new manager ID for the employee (leave empty for no manager):', //input 1 for now...need to fix
                    },
                ])
                .then(async (answers) => {
                    const { firstName, lastName, roleId } = answers;
                    await queries.updateEmployeeRole(firstName, lastName, roleId)
                        .then(() => {
                            console.log(`Employee '${firstName} ${lastName}' updated successfully.`);
                            mainMenu();
                        })
                        .catch((error) => {
                            console.error('An error occurred:', error);
                            mainMenu();
                        });
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                    mainMenu();
                });
                break;

          case 'Exit':
            console.log('Goodbye!');
            process.exit();
        }
    })
    .catch((error) => {
        console.error('An error occurred:', error);
      });
};

mainMenu(); 