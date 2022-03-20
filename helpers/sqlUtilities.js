// Import mysql2
const mysql = require('mysql2');
// Import menu loader
const {loadMainMenu} = require('./menuLoader');
//MySQL pwd
const pwd = "IntacHATLCha30&!@";
//Employee Manager Database
const employee_db = "employee_db";

function connectToDB(database_name, database_password){
  // Connect to database
  const db = mysql.createConnection(
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

  return db;

}


function viewTable(table_name, connection){
     // Queries the database to display all the contents of the departments table
     connection.promise().query(`SELECT * FROM ${table_name}`)
        .then(([rows]) => {
            console.table(rows);
            loadMainMenu()
            .then((data) => {processMenuSelection(data)})
            .catch(err => console.error(err));
      })
        .catch((err) => console.error(err));
}

function processMenuSelection(data) {
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
       const viewAllEmployeesConnection = connectToDB(employee_db, pwd);

       // Queries the database to display all the contents of the employees table
       viewTable('employee', viewAllEmployeesConnection);
       
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
}

module.exports = {connectToDB, viewTable, processMenuSelection};