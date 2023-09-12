-- uses company_db from schema.sql
USE company_db;

-- stating i want to insert the values into department's name column
INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Development'),
    ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Manager', 77500, 1),
    ('Sales Member', 60000, 1),
    ('Software Developer', 80000, 2),
    ('Hardware Developer', 85000, 2),
    ('Marketing Manager', 70000, 3),
    ('Marketing Member', 45000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Gustavo', 'Fring', 1, NULL),
    ('Mike', 'Ehrmantraut', 2, 1), 
    ('Walter', 'White', 3, NULL), 
    ('Jesse', 'Pinkman', 4, NULL), 
    ('Saul', 'Goodman', 5, NULL),  
    ('Jimmy', 'McGill', 6, 5);  

    -- gus is a sales manager, has no one to report to
    -- mike is a sales member, reports to gus
    -- walter is a software developer, has no one to report to
    -- jesse is a hardware developer, has no one to report to
    -- saul goodman is marketing manager, has no one to report to
    -- jimmy mcgill is a marketing member, reports to saul
    -- we don't like skylar here.

    -- layout received from xpert learning