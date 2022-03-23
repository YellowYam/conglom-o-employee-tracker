// Import mysql2
const mysql = require('mysql2');
// Import console.table
const cTable = require('console.table');

// Import menu loader
const { loadMainMenu, loadDepartmentCreator, loadRoleCreator,
  loadEmployeeCreator, loadEmployeeRoleUpdater, loadEmployeeViewMenu,
  loadBudgetViewer, loadEmployeeManagerUpdater, loadEmployeeDeletion,
   loadRoleDeletion, loadDepartmentDeletion }
  = require('./menuLoader');

//MySQL pwd 
const hash = "$2b$10$pipQC4y8evva8jf3thP3q./Bb87l7nP9EqF7aMBJel6ZpoDzFJzmu";
//Employee Manager Database
const employee_db = "employee_db";

// Function takes a database name and its password and returns a connection object in a variable.
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

/*******************************************************************/

/*******************************************************************/
/******** These functions include prepared statements **************/
/*******************************************************************/

/*******************************************************************/

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

function viewRolesTable(connection) {
  //Queries the database to display all the contents of the roles table
  connection.promise().query(`SELECT role.id AS id, role.title AS title, role.salary AS salary, 
                              department.department_name AS department 
                              FROM role 
                              JOIN department 
                              ON role.department_id = department.id`)
    .then(([rows]) => {
      console.table(rows);
      loadMainMenu()
        .then((data) => { processMenuSelection(data) })
        .catch(err => console.error(err));
    })
    .catch((err) => console.error(err));
}

function viewEmployeesTable(connection) {
  //Queries the database to display all the contents of the employees table
  connection.promise().query(`SELECT employee.id AS ID, employee.first_name AS First_Name,
                               employee.last_name AS Last_Name, 
                               IFNULL(role.title, "No title") AS Title,
                               IFNULL(role.salary, "No salary") AS Salary,
                               IFNULL(department.department_name, "No Department") AS Department,
                               IFNULL(CONCAT(manager.first_name, " ",  manager.last_name), "No Manager") AS Manager
                               FROM employee 
                               INNER JOIN role 
                               ON employee.role_id = role.id 
                               INNER JOIN department 
                               ON role.department_id = department.id
                               LEFT JOIN employee AS manager 
                               ON manager.id = employee.manager_id`)
    .then(([rows]) => {
      console.table(rows);
      loadMainMenu()
        .then((data) => { processMenuSelection(data) })
        .catch(err => console.error(err));
    })
    .catch((err) => console.error(err));

}

// View Employees by Manager
function viewEmployeesByManagerTable(connection) {
  //Queries the database to display employees by manager
  connection.promise().query(`SELECT employee.id AS ID, employee.first_name AS First_Name,
                              employee.last_name AS Last_Name, employee.manager_id AS Manager_ID,
                              IFNULL(CONCAT(manager.first_name, " ",  manager.last_name), "No Manager") AS Manager
                              FROM employee 
                              LEFT JOIN employee AS manager 
                              ON manager.id = employee.manager_id
                              ORDER BY employee.manager_id`)
    .then(([rows]) => {
      console.table(rows);
      loadMainMenu()
        .then((data) => { processMenuSelection(data) })
        .catch(err => console.error(err));
    })
    .catch((err) => console.error(err));
}



// View Employees by Department
function viewEmployeesByDepartmentTable(connection) {
  //Queries the database to display employees by department
  connection.promise().query(`SELECT employee.id AS ID, employee.first_name AS First_Name,
                              employee.last_name AS Last_Name, role.department_id AS Department_ID, department.department_name AS Department
                              FROM employee 
                              LEFT JOIN role AS role 
                              ON employee.role_id = role.id
                              LEFT JOIN department AS department
                              ON role.department_id = department.id
                              ORDER BY department.id`)
    .then(([rows]) => {
      console.table(rows);
      loadMainMenu()
        .then((data) => { processMenuSelection(data) })
        .catch(err => console.error(err));
    })
    .catch((err) => console.error(err));

}

// View total utilized budget for department (sum all employee salaries)
function viewUtilizedBudget(department_id, connection) {
  connection.promise().query(`SELECT    
                              SUM(employeeSalaries.salary) AS Total_Utilized_Budget
                              FROM         
                              (SELECT 
                                 employee.id,
                                 role.salary,
                                 role.department_id
                               FROM employee
                               LEFT JOIN role ON employee.role_id = role.id)
                               AS employeeSalaries
                               LEFT JOIN department ON employeeSalaries.department_id = department.id
                               WHERE department.id = ${department_id}`)
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

function addEmployee(first_name, last_name, role_id, manager_id, connection) {
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

function updateEmployeeRole(employee_id, newRole_id, connection) {
  // Queries the database to update an employee role
  connection.promise().query(`UPDATE employee SET role_id = "${newRole_id}" WHERE id = ${employee_id}`)
    .then(([rows]) => {
      console.table(rows);
      loadMainMenu()
        .then((data) => { processMenuSelection(data) })
        .catch(err => console.error(err));
    })
    .catch((err) => console.error(err));
}


// Update Employee manager

function updateEmployeeManager(employee_id, newManager_id, connection) {
  connection.promise().query(`UPDATE employee SET manager_id = "${newManager_id}" WHERE id = ${employee_id}`)
    .then(([rows]) => {
      console.table(rows);
      loadMainMenu()
        .then((data) => { processMenuSelection(data) })
        .catch(err => console.error(err));
    })
    .catch((err) => console.error(err));


}

// Delete Department

function deleteDepartment(department_id, connection) {
  connection.promise().query(`DELETE FROM department WHERE id = ${department_id}`)
    .then(([rows]) => {
      console.table(rows);
      loadMainMenu()
        .then((data) => { processMenuSelection(data) })
        .catch(err => console.error(err));
    })
    .catch((err) => console.error(err));

}

// Delete Role

function deleteRole(role_id, connection) {
  connection.promise().query(`DELETE FROM role WHERE id = ${role_id}`)
  .then(([rows]) => {
    console.table(rows);
    loadMainMenu()
      .then((data) => { processMenuSelection(data) })
      .catch(err => console.error(err));
  })
  .catch((err) => console.error(err));


}

// Delete Employee

function deleteEmployee(employee_id, connection) {
  connection.promise().query(`DELETE FROM employee WHERE id = ${employee_id}`)
  .then(([rows]) => {
    console.table(rows);
    loadMainMenu()
      .then((data) => { processMenuSelection(data) })
      .catch(err => console.error(err));
  })
  .catch((err) => console.error(err));

}




/***********************************************************/

/***********************************************************/
/******  This function handles new menu selections *********/
/***********************************************************/

/************************************************************/

function processMenuSelection(data) {
  // Switch for possible menu imputs
  switch (data.menu_choice) {

    case "view all departments":
      // Connects to database
      var viewAllDepartmentsConnection = connectToDB(employee_db, hash);

      // Queries the database to display all the contents of the departments table
      viewTable('department', viewAllDepartmentsConnection);  // viewTable instantiates a new main-menu prompt

      //End case
      break;

    case "view all roles":
      // Connect to database
      var viewAllRolesConnection = connectToDB(employee_db, hash);

      // Queries the database to display all the contents of the roles table
      viewRolesTable(viewAllRolesConnection);


      //End case
      break;

    case "view all employees":
      // Connect to database
      var viewAllEmployeesConnection = connectToDB(employee_db, hash);

      // Queries the database to display all the contents of the employees table
      loadEmployeeViewMenu()
        .then((view) => {
          console.log(view);
          if (view.order === "Manager") {
            viewEmployeesByManagerTable(viewAllEmployeesConnection);
          }
          else if (view.order === "Department") {
            viewEmployeesByDepartmentTable(viewAllEmployeesConnection);
          }
          else if (view.order === "ID") {
            viewEmployeesTable(viewAllEmployeesConnection);
          }
          else { new Error("Could not view table") };
        })
        .catch(err => console.error(err));


      //End case
      break;

    case "view department total utilized budget":
      var viewDepartmentBudgetConnection = connectToDB(employee_db, hash);

      viewDepartmentBudgetConnection.promise().query('SELECT * FROM department')
        .then(([rows]) => {
          var departments = [];
          for (let i = 0; i < rows.length; i++) {
            departments.push(rows[i].department_name);
          }

          loadBudgetViewer(departments, rows)
            .then((department) => {

              // A filter function to retrieve the id for the ammended department
              function findDepartment(row) {
                return row.department_name === department.name;
              }

              var department = rows.filter(findDepartment)[0].id;


              viewUtilizedBudget(department, viewDepartmentBudgetConnection);


            }) //Prepared statment
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
      break;

    case "add a department":
      // Connect to database
      var addADepartmentConnection = connectToDB(employee_db, hash);

      // Department creator uses inquirer
      loadDepartmentCreator()
        .then((data) => { addDepartment(data.department_name, addADepartmentConnection) }) //Prepared statment
        .catch(err => console.error(err));


      break;

    case "add a role":
      // Connect to database
      var addARoleConnection = connectToDB(employee_db, hash);

      addARoleConnection.promise().query('SELECT * FROM department')
        .then(([rows]) => {
          var departments = [];
          for (let i = 0; i < rows.length; i++) {
            departments.push(rows[i].department_name);
          }


          loadRoleCreator(departments, rows)
            .then((data) => {

              // A filter function to retrieve the id for the ammended department
              function findDepartment(row) {
                return row.department_name === data.department;
              }

              const department = rows.filter(findDepartment)[0].id;



              addRole(data.role_name, data.salary, department, addARoleConnection)
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));

      break;
    case "add an employee":
      // Connect to database
      var addAnEmployeeConnection = connectToDB(employee_db, hash);

      //The server must be queried to populate these two arrays.
      var roles = [];
      var employees = ['None'];

      //First the application queries all the roles.
      addAnEmployeeConnection.promise().query('SELECT * FROM role')
        //Then it populates the roles array.
        .then(([roleRows]) => {
          for (let i = 0; i < roleRows.length; i++) {
            roles.push(roleRows[i].title);
          }
          // These roles are passed to the next step.
          return [roleRows];
        })
        .then(([roleRows]) => {
          // Second the application queries all the employees
          addAnEmployeeConnection.promise().query('SELECT * FROM employee')
            //Then it populates the employees array.
            .then(([employeeRows]) => {
              for (let i = 0; i < employeeRows.length; i++) {
                employees.push(`${employeeRows[i].first_name} ${employeeRows[i].last_name}`);
              }

              //The employee Creator loads before the end of the async method
              loadEmployeeCreator(roles, employees)
                // Then this utility processes the creator data.
                .then((data) => {

                  // A filter function to retrieve the id for the ammended role
                  function findRole(row) {
                    return row.title === data.role;
                  }

                  // A filter function to retrieve the id for the ammended employee
                  function findManager(row) {
                    return row.first_name + " " + row.last_name === data.manager;
                  }

                  var role = roleRows.filter(findRole)[0].id;
                  var manager = employeeRows.filter(findManager)[0].id;


                  //All the processed data is passed to the addEmployee function
                  addEmployee(data.first_name, data.last_name, role, manager, addAnEmployeeConnection);
                })
                .catch(err => console.error(err));


            })
            .catch(err => console.error(err))
        }

        )
        .catch(err => console.error(err));
      break;
    case "update an employee role":
      // Connect to database
      var updateAnEmployeeRoleConnection = connectToDB(employee_db, hash);

      //The server must be queried to populate these two arrays.
      var roleArray = [];
      var employeeArray = [];

      //First the application queries all the roles.
      updateAnEmployeeRoleConnection.promise().query('SELECT * FROM role')
        //Then it populates the roles array.
        .then(([roleRows]) => {
          for (let i = 0; i < roleRows.length; i++) {
            roleArray.push(roleRows[i].title);
          }
          // These roles are passed to the next step.
          return [roleRows];
        })
        .then(([roleRows]) => {
          // Second the application queries all the employees
          updateAnEmployeeRoleConnection.promise().query('SELECT * FROM employee')
            //Then it populates the employees array.
            .then(([employeeRows]) => {
              for (let i = 0; i < employeeRows.length; i++) {
                employeeArray.push(`${employeeRows[i].first_name} ${employeeRows[i].last_name}`);
              }

              //The employee Creator loads before the end of the async method
              loadEmployeeRoleUpdater(roleArray, employeeArray)
                // Then this utility processes the creator data.
                .then((data) => {

                  // A filter function to retrieve the id for the ammended role
                  function findRole(row) {
                    return row.title === data.role;
                  }

                  // A filter function to retrieve the id for the ammended employee
                  function findEmployee(row) {
                    return row.first_name + " " + row.last_name === data.employee;
                  }

                  var role = roleRows.filter(findRole)[0].id;
                  var employee = employeeRows.filter(findEmployee)[0].id;

                  //All the processed data is passed to the addEmployee function
                  updateEmployeeRole(employee, role, updateAnEmployeeRoleConnection);
                })
                .catch(err => console.error(err));


            })
            .catch(err => console.error(err))
        }

        )
        .catch(err => console.error(err));
      break;

    case "update an employee manager":
      // Connect to database
      var updateAnEmployeeManagerConnection = connectToDB(employee_db, hash);

      //The server must be queried to populate these two arrays.
      var employeeArray = [];


      // First the application queries all the employees
      updateAnEmployeeManagerConnection.promise().query('SELECT * FROM employee')
        //Then it populates the employees array.
        .then(([employeeRows]) => {
          for (let i = 0; i < employeeRows.length; i++) {
            employeeArray.push(`${employeeRows[i].first_name} ${employeeRows[i].last_name}`);
          }

          //The employee Creator loads before the end of the async method
          loadEmployeeManagerUpdater(employeeArray)
            // Then this utility processes the creator data.
            .then((data) => {

              // A filter function to retrieve the id for the ammended role
              function findManager(row) {
                return row.first_name + " " + row.last_name === data.manager;
              }

              // A filter function to retrieve the id for the ammended employee
              function findEmployee(row) {
                return row.first_name + " " + row.last_name === data.employee;
              }

              var manager = employeeRows.filter(findManager)[0].id;
              var employee = employeeRows.filter(findEmployee)[0].id;

              //All the processed data is passed to the addEmployee function
              updateEmployeeManager(employee, manager, updateAnEmployeeManagerConnection);
            })
            .catch(err => console.error(err));


        })
        .catch(err => console.error(err));
      break;

    case "delete an employee":
      // Connect to database
      var deleteAnEmployeeConnection = connectToDB(employee_db, hash);

        //The server must be queried to populate the employee array.
        var employeeArray = [];

        // First the application queries all the employees
      deleteAnEmployeeConnection.promise().query('SELECT * FROM employee')
      //Then it populates the employees array.
      .then(([employeeRows]) => {
        for (let i = 0; i < employeeRows.length; i++) {
          employeeArray.push(`${employeeRows[i].first_name} ${employeeRows[i].last_name}`);
        }
          //The employee Deleter loads before the end of the async method
          loadEmployeeDeletion(employeeArray)
           // Then this utility processes the creator data.
           .then((data) => {

            // A filter function to retrieve the id for the ammended employee
            function findEmployee(row) {
              return row.first_name + " " + row.last_name === data.name;
            }

            var employee = employeeRows.filter(findEmployee)[0].id;

            //All the processed data is passed to the addEmployee function
            deleteEmployee(employee, deleteAnEmployeeConnection);
          })
          .catch(err => console.error(err));
        })
      break;
      case "delete a role":
      // Connect to database
      var deleteARoleConnection = connectToDB(employee_db, hash);

        //The server must be queried to populate the roles array.
        var rolesArray = [];

        // First the application queries all the roles
      deleteARoleConnection.promise().query('SELECT * FROM role')
      //Then it populates the employees array.
      .then(([roleRows]) => {
        for (let i = 0; i < roleRows.length; i++) {
          rolesArray.push(`${roleRows[i].title}`);
        }
          //The employee Deleter loads before the end of the async method
          loadRoleDeletion(rolesArray)
           // Then this utility processes the deleter data.
           .then((data) => {

            // A filter function to retrieve the id for the ammended employee
            function findRole(row) {
              return row.title === data.title;
            }

            var role = roleRows.filter(findRole)[0].id;

            //All the processed data is passed to the addEmployee function
            deleteRole(role, deleteARoleConnection);
          })
          .catch(err => console.error(err));
        })
      break;
      case "delete a department":
      // Connect to database
      var deleteADepartmentConnection = connectToDB(employee_db, hash);

        //The server must be queried to populate the employee array.
        var departmentArray = [];

        // First the application queries all the employees
      deleteADepartmentConnection.promise().query('SELECT * FROM department')
      //Then it populates the employees array.
      .then(([departmentRows]) => {
        for (let i = 0; i < departmentRows.length; i++) {
          departmentArray.push(`${departmentRows[i].department_name}`);
        }
          //The employee Deleter loads before the end of the async method
          loadDepartmentDeletion(departmentArray)
           // Then this utility processes the creator data.
           .then((data) => {

            // A filter function to retrieve the id for the ammended employee
            function findDepartment(row) {
              return row.department_name === data.name;
            }

            var department = departmentRows.filter(findDepartment)[0].id;

            //All the processed data is passed to the addEmployee function
            deleteDepartment(department, deleteADepartmentConnection);
          })
          .catch(err => console.error(err));
        })
      break;
    default:
      console.error("No cases found");
      break;
  } 
}

module.exports = { processMenuSelection };