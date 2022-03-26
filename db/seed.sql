INSERT INTO department (department_name)
VALUES ("Peripherals"),
       ("Components "),
       ("Coffee Shop"),
       ("Computers");

INSERT INTO role (title, salary, department_id)
VALUES ("Customer Service", 10000, 1),
       ("Software Developer", 70000, 4),
       ("Artist", 70000, 4),
       ("Barista", 14000, 3),
       ("Manager", 100000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith", 2 , NULL),
       ("Amira", "Afzal", 1, 1),
       ("Christoper", "Lee", 3, 1),
       ("Veronica", "Rodriguez", 4, 1),
       ("Igor", "Ivanov", 2, 1);