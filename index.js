const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table'); //helps display my data as a table, https://developer.mozilla.org/en-US/docs/Web/API/console/table

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
                'Add an employee',
                "Update an employee's role",
                'Exit Application',
            ],
        },
    ])
    
    .then(async (answer) => {
        switch(answer.select) {
            // view cases
            case 'View all departments':
                const departments = await queries.viewAllDepartments();
                console.table(departments); 
                break;
            
            case 'View all roles':
                const roles = await queries.viewAllRoles();
                console.table(roles);
                break;

            case 'View all employees':
                const employees = await queries.viewAllEmployees();
                console.table(employees);
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
                    await queries.addDepartment(newDepartment);
                    console.log(`Department '${newDepartment}' added successfully.`);
                    mainMenu(); //returns us to the start
                })
                .catch((error) => {
                    console.error('there was an error:', error);
                    mainMenu();
                });
                break;
        }
    })
}

mainMenu(); 