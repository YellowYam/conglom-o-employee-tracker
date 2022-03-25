SELECT role.id AS id, role.title AS title, role.salary AS salary, 
                              IFNULL(department.department_name, "No Department") AS department 
                              FROM role 
                              LEFT JOIN department 
                              ON role.department_id = department.id