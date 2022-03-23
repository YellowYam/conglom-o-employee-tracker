// Import inquirer module
const inquirer = require('inquirer');

function loadMainMenu() {

    /** Inquirer questions to select new employee type **/
    const mainMenu = {
        type: 'list',
        name: 'menu_choice',
        message: 'Main Menu: ',
        choices: ['view all departments', 'view department total utilized budget', 'view all roles', 'view all employees', new inquirer.Separator(),  'add a department', 'add a role',
                   'add an employee', new inquirer.Separator(), 'update an employee role', 'update an employee manager' , new inquirer.Separator() , 'delete a department', 'delete a role',
                   ,'delete an employee', new inquirer.Separator()]
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

function loadRoleCreator(departments) {

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
            choices: departments
        },
    ];

    return inquirer
        .prompt(roleCreator);
}

function loadEmployeeCreator(roles, employees) {
    /** Inquirer questions to create a new employee **/
    const employeeCreator = [
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee\'s first name?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee\'s last name?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'Choose a role for the employee:',
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: employees
        },
    ];

    return inquirer
        .prompt(employeeCreator);
}

function loadEmployeeRoleUpdater(roles, employees) {
    /** Inquirer questions to create a new employee **/
    const employeeRoleUpdater = [
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee shall be updated?',
            choices: employees
        },
        {
            type: 'list',
            name: 'role',
            message: 'Choose a new role for the employee:',
            choices: roles
        },
    ];

    return inquirer
        .prompt(employeeRoleUpdater);

}

function loadEmployeeManagerUpdater(employees) {
    /** Inquirer questions to create a new employee **/
    const employeeManagerUpdater = [
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee shall be updated?',
            choices: employees
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Choose a new manager for the employee:',
            choices: employees
        },
    ];

    return inquirer
        .prompt(employeeManagerUpdater);

}

function loadEmployeeViewMenu() {
    /** Inquirer questions to create a new employee **/
    const employeeView = [
        {
            type: 'list',
            name: 'order',
            message: 'View employees by: ',
            choices: ['ID', 'Manager', 'Department']
        },
    ];

    return inquirer
        .prompt(employeeView);

}

function loadBudgetViewer() {
    /** Inquirer questions to create a new employee **/
    const viewSelector = [
        {
            type: 'list',
            name: 'view',
            message: 'How shall the budget be viewed?',
            choices: ['view by department', 'view total']
        },
    ];

    return inquirer
        .prompt(viewSelector);

}

function loadEmployeeDeletion(employees) {
    /** Inquirer questions to create a new employee **/
    const employeeSelector = [
        {
            type: 'list',
            name: 'name',
            message: 'Which employee shall be deleted?',
            choices: employees
        },
    ];

    return inquirer
        .prompt(employeeSelector);

}

function loadRoleDeletion(roles) {
    /** Inquirer questions to create a new employee **/
    const roleSelector = [
        {
            type: 'list',
            name: 'title',
            message: 'Which role shall be deleted?',
            choices: roles
        },
    ];

    return inquirer
        .prompt(roleSelector);

}

function loadDepartmentDeletion(departments) {
    /** Inquirer questions to create a new employee **/
    const departmentSelector = [
        {
            type: 'list',
            name: 'name',
            message: 'Which department shall be deleted?',
            choices: departments
        },
    ];

    return inquirer
        .prompt(departmentSelector);

}

module.exports = {
    loadMainMenu, loadDepartmentCreator, loadRoleCreator,
    loadEmployeeCreator, loadEmployeeRoleUpdater, loadEmployeeViewMenu,
    loadBudgetViewer, loadEmployeeManagerUpdater, loadEmployeeDeletion,
    loadRoleDeletion, loadDepartmentDeletion
};