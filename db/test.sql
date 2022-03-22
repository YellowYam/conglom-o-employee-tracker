SELECT employee.id AS ID, employee.first_name AS First_Name,
  employee.last_name AS Last_Name, role.department_id AS Department_ID, department.department_name AS Department
  FROM employee 
  LEFT JOIN role AS role 
  ON employee.role_id = role.id
  LEFT JOIN department AS department
  ON role.department_id = department.id
  ORDER BY department.id