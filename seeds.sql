USE mystaf_db;

/*Insert dummy data**/

/**iNSERT DUMMY DATTA TO EMPLOYEES*//
INSERT INTO employees (firstname, lastname, role_id, manager_id)
VALUES (DMITRY, VORONOV, 1, 101);

/**INSERT DUMMY DATA INTO ROLE*//

INSERT INTO role(title, salary, department_id)
VALUES (intern, 0, 201);

/**insert dummy data into department*/

INSERT INTO department(name)
VALUES(DEVELOPER);
