// Import inquirer module
const inquirer = require('inquirer');

function loadMainMenu() {

    /** Inquirer questions to select new employee type **/
    const mainMenu = {
        type: 'list',
        name: 'menu_choice',
        message: 'Main Menu: ',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role',
            'add an employee', 'update an employee role'],
    };

    return inquirer
        //Load main menu
        .prompt(mainMenu);
}


function loadDepartmentCreator() {

    /** Inquirer questions to create a new department **/
    const departmentCreator = [
        {
            type: 'input',
            name: 'department_name',
            message: 'What shall the department be named?',
        },
    ];

    return inquirer
        .prompt(departmentCreator);
}

function loadRoleCreator(roles) {

    /** Inquirer questions to create a new role **/
    const roleCreator = [
        {
            type: 'input',
            name: 'role_name',
            message: 'What shall the role be named?',
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What shall the role be paid?',
        },
        {
            type: 'list',
            name: 'department',
            message: 'To which department shall this role belong?',
            choices: roles
        },
    ];

    return inquirer
        .prompt(roleCreator);
}


module.exports = { loadMainMenu, loadDepartmentCreator, loadRoleCreator };