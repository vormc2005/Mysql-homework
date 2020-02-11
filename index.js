const inquirer = require("inquirer");
const mysql = require("mysql");

/**Connection */
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Mysql#123",
  database: "mystaf_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  onStart();


  
});




// }
/**function that will run on strat, it will collect prompts form a user on what they would like to do */

onStart = () => {
  inquirer.
    prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'userChoice',
        choices: ['View All Employees',
          'View All Employees by Department',
          'View All Employees by Manager',
          'Update employee roles',
          'Add employee',
          'Add role',
          'Add department',
          'Remove employee',
          'Update manager',
          'Exit'
        ]
      }
    ])
    .then(answers => {

      /*display all of the employees*/
      if (answers.userChoice === 'View All Employees') {

        console.log("-------------------------")
        viewAll();
        console.log("-------------------------")
        /*View all employees by department*/
      }

      else if (answers.userChoice === 'View All Employees by Department') {
        console.log('\n')
        console.log('-------------------------');
        viewByDepartment();
      }

      else if (answers.userChoice === 'View All Employees by Manager') {
        console.log('\n')
        console.log('-------------------------');
        viewByManager();
      }
      else if (answers.userChoice === 'Update employee roles') {
        console.log('\n')
        console.log('-------------------------');
        updateRoles();
        /*View all Employees by manager*/

      } else if (answers.userChoice === 'Add employee') {
        console.log('\n')
        console.log('-------------------------');
        AddEmployee();
      }

      else if (answers.userChoice === 'Add department') {
        console.log('\n')
        console.log('-------------------------');
        AddDepartment();
      }
      else if (answers.userChoice === 'Add role') {
        console.log('\n')
        console.log('-------------------------');
        AddRole();

      }
      else if (answers.userChoice === 'Remove employee') {

        console.log('\n')
        console.log('-------------------------');
        removeEmployee();
      }
      else if (answers.userChoice === 'Update manager') {

        console.log('\n')
        console.log('-------------------------');
        updateManager();
      }
      else {
        endOfUse();
        console.log('Exit - success')
      }
    })
};

/**Here are the functions for all of the operations */
/**TO post joint tables with names, department roles and salary */
viewAll = () => {
  connection.query("SELECT employees.id, firstname, lastname, title, salary FROM employees INNER JOIN role ON employees.role_id=role.id", function (err, response) {
    if (err) throw err;
    console.log('\n');
    console.log('*********************************');
    console.table(response);
    // endOfUse();
    endOfUse();
  });


};

viewByDepartment = () => {
  connection.query("SELECT employees.id, firstname, lastname, name, manager FROM employees LEFT JOIN department ON employees.manager_id = department.id", function (err, response) {
    if (err) throw err;
    console.log('\n');
    console.log('*********************************');
    console.table(response);
    endOfUse();
  });


}

viewByManager = () => {
  connection.query("SELECT employees.id, firstname, lastname, name, manager FROM employees LEFT JOIN department ON employees.manager_id = managers_id", function (err, response) {
    if (err) throw err;
    console.log('\n');
    console.log('*********************************');
    console.table(response);
    endOfUse();
  });
};
//************************************************************************ */
/************************Update functions**********************************/

updateRoles = () => {

  noresetviewAll();

  connection.query("SELECT * FROM employees", function (err, results) {
    if (err) throw err;

    console.log("******************************")

    inquirer.
      prompt([
        {
          type: "input",
          message: "Tye ID of the person to update his role_id",
          name: "personsId",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          type: "input",
          message: "Type new role ID",
          name: "newRole",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ]).then(function (answer) {
        var query = connection.query("UPDATE employees SET ? WHERE ?",
          [
            {
              role_id: answer.newRole
            },
            {
              id: answer.personsId
            }
          ],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + "Employee updated\n")
            console.log("**********************************");
            // viewAll();
            noresetviewAll();
            endOfUse();
          }
        )
      });
  });
};


updateManager = () => {

    displaydepartments();
  connection.query("SELECT * FROM department", function (err, results) {    

    console.log("******************************")

    inquirer.
      prompt([
        {
          type: "input",
          message: "Type department ID that you would like manager to be updated",
          name: "deptId",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          type: "input",
          message: "Type new manager name",
          name: "newMgr"

        },
        {
          type: "input",
          message: "Type new manager id",
          name: "newMgrid",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ]).then(function (answer) {
        var query = connection.query("UPDATE department SET ? WHERE ?",
          [
            {
              manager: answer.newMgr,
              managers_id: answer.newMgrid
            },
            {
              id: answer.deptId
            }
          ],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + "Manager updated\n")
            console.log("**********************************");
            displaydepartments();
            endOfUse();
            
          }

        )
      });
  });
};


//********************************* */

/**************************************************************************
 *                      Adding functions
 **************************************************************************/

AddEmployee = () => {
  console.log("Let's add employee")
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter first name",
        name: "first"
      },
      {
        type: "input",
        message: "Please enter last name",
        name: "last"
      },
      {
        type: "input",
        message: "Please enter role id",
        name: "roleId",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        type: "input",
        message: "Please enter manager's id",
        name: "managersId",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          firstname: response.first,
          lastname: response.last,
          role_id: response.roleId,
          manager_id: response.managersId || 0
        },
        function (err) {
          if (err) throw err;
          console.log("Your new employee was added successfully!")
          endOfUse();
        }
      );
    });

};
//**Function to add role */
AddRole = () => {
  console.log("Let's add new Role")
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter role that you would like to add",
        name: "newrole"
      },
      {
        type: "input",
        message: "Please enter salary for the new role",
        name: "newSalary",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        type: "input",
        message: "Please enter department id for a new role",
        name: "departmentId",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: response.newrole,
          salary: response.newSalary,
          department_id: response.departmentId,

        },
        function (err) {
          if (err) throw err;
          console.log("Your new role was added successfully!")
          endOfUse();
        }
      );
    });

};

AddDepartment = () => {
  console.log("Let's add new department")
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter department that you would like to add",
        name: "newdepartment"
      },
      {
        type: "input",
        message: "Please enter Manager name",
        name: "managername",

      },
      {
        type: "input",
        message: "Please assign manager id",
        name: "managerId",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: response.newdepartment,
          manager: response.managername,
          managers_id: response.managerId,

        },
        function (err) {
          if (err) throw err;
          console.log("Your new department was added successfully!")
          endOfUse();

        }
      );
    });

};

/****************************************************************************
 * ***************Function that removes employee of the list************** */
removeEmployee = () => {

  noresetviewAll();

  console.log("Please press any button\n");

  inquirer.
    prompt([
      {

        type: "input",
        message: "Type ID that you would like to delete",
        name: "DeleteId"
      }
    ]).then(function (answer) {
      connection.query("DELETE FROM employees WHERE ?",
        {
          id: answer.DeleteId
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " products deleted!\n");
          noresetviewAll();
          console.log("\n");
          endOfUse();
        }

      )
    });

}


/**Final function, if person does not want to proceed exits the system */
endOfUse = () => {
  inquirer.
    prompt([
      {
        type: "list",
        message: "Would you like to proceed?",
        name: "endQuestion",
        choices: ["Yes", "No"]

      }
    ]).then(function (answer) {
      if (answer.endQuestion === "Yes") {
        onStart()
      } else {
        console.log("Thank you for using our APP!")
        connection.end();
      }
    })
}

/***************************************************************
 * *******Functions helpers*************************************
 */


displaydepartments =()=>{
connection.query("SELECT * FROM department", function (err, results) {
  if (err) throw err;
  console.log('\n');
  console.log('*********************************');
  console.table(results);

})
};

noresetviewAll = () => {
  /*Show table with all of the employees*/
  connection.query("SELECT employees.id, firstname, lastname, title, salary FROM employees INNER JOIN role ON employees.role_id=role.id", function (err, response) {
    if (err) throw err;
    console.log('\n');
    console.log('*********************************');
    console.table(response);
  });
}