# Conglom-O-Employee Tracker [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
  ## Description
  A console interface that connects with a MySQL back-end and queries an employee database.

  ##### A [Walkthrough Video]() is available. <br><br>

  ## TOC
  1. [Installation](#installation)   
  2. [Usage](#usage)                 
  3. [Contributors](#contributors)
  4. [Tests](#tests)
  5. [Questions](#questions)

  ## Installation

  ### Git Bash
  ***
  Type these commands into git bash to install the application. Conglom-O-Employee Tracker was created with
  [git bash](https://git-scm.com/) and [node package manager](https://nodejs.org/en/).

  ```
  $ git clone git@github.com:YellowYam/Conglom-O-Employee-Tracker.git
  $ cd ../path/to/the/file
  $ npm install
  ``` 

  
  Node Modules:
  + [Inquirer](https://www.npmjs.com/package/inquirer) - runs the console prompt
  + [MySQL2](https://www.npmjs.com/package/mysql2) - connects the SQL database to Node.js
  + [Bcrypt](https://www.npmjs.com/package/bcrypt) - hashes the database password
  + [Console Table](https://www.npmjs.com/package/console.table) - displays database information

  ### MySQL

  The database must be installed onto your personal PC to load the database. [This Installation Guide](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide) contains all the instructions. Once the database has been installed, the schema and seed must be loaded into the database.

  1. Navigate to <code>/cd/path/to/application/db</code> in a bash console.
  2. Run <code>mysql -u root -p</code>
  3. Enter your database password.
  4. Run <code>source schema.sql</code>
  5. Run <code>source seed.sql</code>

## Usage

1. Run <code> npm start </code> to begin the app. (Note that the logo will only appear on console windows large enough to display it.)
2. Use the arrow keys to navigate menu choices. Enter selects an option.
3. Press <code>Ctl + C</code> to exit the app.

#### A [Walkthrough Video]() is available. 

  ## Contributors
  If you would like to become a contributor on this project, please find my contact information in the [questions](#questions)
  section of this README.

  * Cody S. (YellowYam)

  ## Tests
  ![Issues](https://img.shields.io/github/issues/YellowYam/Conglom-O-Employee-Tracker?style=plastic)<br>
  At present, no tests can be performed on this code. The application meets all requirements without errors.

  ## Questions?
  <a href = "mailto:cody.scoles@gmail.com"> Email me! </a> <br>
  <a href = "https://www.github.com/YellowYam"> GitHub </a>

  ## License 

  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)<br>
  (The license badge is a clickable link.)

