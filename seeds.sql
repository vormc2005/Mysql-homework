-- USE mystaf_db;

/*Insert dummy data**/

/**iNSERT DUMMY DATTA TO EMPLOYEES*/
INSERT INTO employees (firstname, lastname, role_id, manager_id)
VALUES ("DMITRY", "VORONOV", 1, 1;

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

INSERT INTO department(name)
VALUES ("Engineering");

INSERT INTO department(name)
VALUES("Sales");

INSERT INTO department(name)
VALUES ("Business Development");



