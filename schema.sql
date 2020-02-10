DROP DATABASE IF EXISTS mystaf_db;
CREATE DATABASE mystaf_db;
USE mystaf_db;

CREATE TABLE employees(
    id INTEGER (5) AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    role_id INTEGER (3) NOT NULL,
    manager_id INTEGER(3),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INTEGER (3) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    department_id INTEGER(4),
    PRIMARY KEY(id)
);

CREATE TABLE department(
   id INTEGER(4) AUTO_INCREMENT NOT NULL,
   name VARCHAR(30),
   manager VARCHAR(30) NULL,
   managers_id INTEGER(3) NOT NULL,
   PRIMARY KEY(id) 

);






/*Insert dummy data**/

/**iNSERT DUMMY DATTA TO EMPLOYEES*/
INSERT INTO employees (firstname, lastname, role_id, manager_id)
VALUES ("DMITRY", "VORONOV", 1, 1);

/**INSERT DUMMY DATA INTO ROLE*/

INSERT INTO role(title, salary, department_id)
VALUES ("intern", 0, 1);

/*insert new role/titles AND ADDING VALUES TO A ROLE TABLE*/

INSERT INTO role(title, salary, department_id)
VALUES("Developer", 100000, 1);

INSERT INTO role(title, salary, department_id)
VALUES("Sales", 80000, 2);

INSERT INTO role(title, salary, department_id)
VALUES("Engineer", 120000, 1);

INSERT INTO role(title, salary, department_id)
VALUES("Business analyst", 100000, 3);


INSERT INTO role (title, salary,department_id)
VALUES ("Other", 60000, 3);


/**Inserting data into department*/

INSERT INTO department(name, manager, managers_id)
VALUES ("Engineering", "Gary Almes", 1);

INSERT INTO department(name, manager, managers_id)
VALUES("Sales", "N/A", 2);

INSERT INTO department(name, manager, managers_id)
VALUES ("Business Development", "N/A", 3);


/**Showing list of all employees: first name, last name, title, department, salary)**/


SELECT firstname, lastname, title, name, salary, manager
FROM employees
INNER JOIN role ON employees.role_id= role.id
INNER JOIN department ON role.department_id = department.id;
