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
    salary DECIMAL(6,2) NOT NULL,
    department_id INTEGER(4),
    PRIMARY KEY(id)
);

CREATE TABLE department(
   id INTEGER(4) AUTO_INCREMENT NOT NULL,
   name VARCHAR(30),
   PRIMARY KEY(id) 

);