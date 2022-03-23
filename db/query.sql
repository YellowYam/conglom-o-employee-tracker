SELECT
SUM(employeeSalaries.salary) AS Total_Utilized_Budget
FROM  (SELECT  employee.id, role.salary, role.department_id FROM employee
      LEFT JOIN role ON employee.role_id = role.id) 
      AS employeeSalaries
      LEFT JOIN department ON employeeSalaries.department_id = department.id WHERE department_id IS NOT NULL
    

                               