// Import inquirer module
const inquirer = require('inquirer');

/** Inquirer questions to select new employee type **/
const mainMenu = {
    type: 'list',
    name: 'menu_choice',
    message: 'Main Menu: ',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role',
      'add an employee', 'update an employee role'],
  };


  function loadMainMenu(){

    return inquirer
      //Load main menu
      .prompt(mainMenu);
  }

  


  module.exports = {loadMainMenu};