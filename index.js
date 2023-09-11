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
    
    .then(async(answer)) => {
        switch(answer.select) {
        }
    }
}

mainMenu(); 