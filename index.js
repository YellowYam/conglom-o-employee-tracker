// Import inquirer module
const inquirer = require('inquirer');
// Import mysql2
const mysql = require('mysql2');
const { viewTable } = require('./helpers/sqlUtilities');

//MySQL pwd
const pwd = "IntacHATLCha30&!@";

/** Inquirer questions to select new employee type **/
const mainMenu = {
  type: 'list',
  name: 'menu_choice',
  message: 'Main Menu: ',
  choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role',
    'add an employee', 'update an employee role'],
};
const employeeManagerLogo =
  ",------------------------------------------------------------------------------------------------------------------------.\n"
  + "|  _____                       _                                   __  __                                                 |\n"
  + "|  | ____|  _ __ ___    _ __   | |   ___    _   _    ___    ___    |  \\/  |   __ _   _ __     __ _    __ _    ___   _ __  |\n"
  + "|  |  _|   | '_ ` _ \\  | '_ \\  | |  / _ \\  | | | |  / _ \\  / _ \\   | |\\/| |  / _` | | '_ \\   / _` |  / _` |  / _ \\ | '__| |\n"
  + "|  | |___  | | | | | | | |_) | | | | (_) | | |_| | |  __/ |  __/   | |  | | | (_| | | | | | | (_| | | (_| | |  __/ | |    |\n"
  + "|  |_____| |_| |_| |_| | .__/  |_|  \\___/   \\__, |  \\___|  \\___|   |_|  |_|  \\__,_| |_| |_|  \\__,_|  \\__, |  \\___| |_|    |\n"
  + "|                      |_|                  |___/                                                    |___/                |\n"
  + "`-------------------------------------------------------------------------------------------------------------------------'"


function connectToDB(database_name, database_password){
  // Connect to database
  const mysql = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: database_password,
      database: database_name
    },
    console.log(`Connected to the {database} database.`)
  );

  return mysql;

}
function init() {
  //Begin inputs
  inquirer
    //Load main menu
    .prompt(mainMenu)
    .then((data) => {
      switch (data.menu_choice) {
        case "view all departments":

          // Connects to database
          const viewAllDepartmentsConnection = connectToDB(employee_db, pwd);

          // Queries the database to display all the contents of the departments table
          viewTable('department', viewAllDepartmentsConnection);


          //End case
          break;
        case "view all roles":
           // Connect to database
           const viewAllRolesConnection = connectToDB(employee_db, pwd);

           // Queries the database to display all the contents of the roles table
           viewTable('role', viewAllRolesConnection);

           //End case
          break;
        case "view all employees":
           // Connect to database
           const viewAllEmployeesConnection= connectToDB(employee_db, pwd);

           // Queries the database to display all the contents of the employees table
           viewTable('employee', viewAllRolesConnection);

           //End case
          break;
        case "add a department":
           // Connect to database
           const addADepartmentConnection = connectToDB(employee_db, pwd);
          break;
        case "add a role":
           // Connect to database
           const addARoleConnection = connectToDB(employee_db, pwd);
          break;
        case "add an employee":
           // Connect to database
           const addAnEmployeeConnection= connectToDB(employee_db, pwd);
          break;
        default:
          console.error("No cases found");
          break;
      }
    })
    .catch((err) => console.error(err));
}
  

init();
