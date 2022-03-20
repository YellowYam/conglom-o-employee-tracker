function viewTable(table_name, connection){
     // Queries the database to display all the contents of the departments table
     connection.query(`SELECT * FROM ${table_name}`, function (err, results) {
        err ? console.error(err) : console.table(results);
      });
}

module.exports = {viewTable};