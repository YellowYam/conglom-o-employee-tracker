// Import mysql2
const mysql = require('mysql2');
// Import menu loader
const { loadMainMenu, loadDepartmentCreator, loadRoleCreator , loadEmployeeCreator} = require('./menuLoader');
//MySQL pwd
const pwd = "IntacHATLCha30&!@";
//Employee Manager Database
const employee_db = "employee_db";

function connectToDB(database_name, database_password) {
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


function viewTable(table_name, connection) {
  // Queries the database to display all the contents of the departments table
  connection.promise().query(`SELECT * FROM ${table_name}`)
    .then(([rows]) => {
      console.table(rows);
      loadMainMenu()
        .then((data) => { processMenuSelection(data) })
        .catch(err => console.error(err));
    })
    .catch((err) => console.error(err));
}

function addDepartment(department_name, connection) {
  // Queries the database to add a department
  connection.promise().query(`INSERT INTO department (department_name) VALUES("${department_name}")`)
    .then(([rows]) => {
      console.table(rows);
      loadMainMenu()
        .then((data) => { processMenuSelection(data) })
        .catch(err => console.error(err));
    })
    .catch((err) => console.error(err));

}

function addRole(role_name, salary, department_id, connection) {
  // Queries the database to add a role
  connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES("${role_name}", ${salary}, ${department_id})`)
    .then(([rows]) => {
      console.table(rows);
      loadMainMenu()
        .then((data) => { processMenuSelection(data) })
        .catch(err => console.error(err));
    })
    .catch((err) => console.error(err));
}

function addEmployee(first_name, last_name, role_id, manager_id) {
  // Queries the database to add an employee
  connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${first_name}", "${last_name}", ${role_id}, ${manager_id})`)
    .then(([rows]) => {
      console.table(rows);
      loadMainMenu()
        .then((data) => { processMenuSelection(data) })
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
      loadDepartmentCreator()
        .then((data) => { addDepartment(data.department_name, addADepartmentConnection) })
        .catch(err => console.error(err));


      break;
    case "add a role":
      // Connect to database
      const addARoleConnection = connectToDB(employee_db, pwd);

      addARoleConnection.promise().query('SELECT * FROM department')
        .then(([rows]) => {
         const departments = []; 
         for(let i = 0; i < rows.length ; i++){
            departments.push(rows[i].department_name);
         };
         
         
          loadRoleCreator(departments, rows)
            .then((data) => { 
            
              // A filter function to retrieve the id for the ammended department
              function findDepartment(row){
                return row.department_name === data.department;
              }

              const department = rows.filter(findDepartment)[0].id;

            
            
              addRole(data.role_name, data.salary, department, addARoleConnection) })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));

          break;
    case "add an employee":
      // Connect to database
      const addAnEmployeeConnection = connectToDB(employee_db, pwd);

      const roles = []; 
      const employees = [];

      addAnEmployeeConnection.promise().query('SELECT * FROM role')
      .then(([rows]) => {
        for(let i = 0; i < rows.length ; i++){
           roles.push(rows[i].title);
        };
      })
      .then(

        addAnEmployeeConnection.promise().query('SELECT * FROM employee')
      .then(([rows]) => {
        for(let i = 0; i < rows.length ; i++){
           employees.push(`${rows[i].first_name} ${rows[i].last_name}`);
        };
      })
      .catch(err => console.error(err))
      
      )

      

      loadEmployeeCreator(roles, employees);
  
      break;
    default:
      console.error("No cases found");
      break;
  }
}

module.exports = { connectToDB, viewTable, addDepartment, processMenuSelection };