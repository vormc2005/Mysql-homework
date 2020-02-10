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
 
 
  // connection.end();
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
         'Add role',
         'Add department',
         'Remove employee',
         'Update employee manager',
         'Exit'
        ]
      }
    ])
    .then(answers => {
      console.log(answers)
      /*display all of the employees*/
      if (answers.userChoice === 'View All Employees'){
        console.log("success",'\n')
        console.log("-------------------------")
        viewAll();
        console.log("-------------------------")
        onStart();

        /*View all employees by department*/
      } else if(answers.userChoice === 'View All Employees by Department'){
        console.log('All Employees by Department success', "\n")
        viewByDepartment(); 
        onStart();


      } else if(answers.userChoice === 'View All Employees by Manager'){
        console.log('All Employees by Manager success', '\n')
        console.log('-------------------------');
        viewByManager();


      } 
      else if(answers.userChoice === 'Update employee roles'){
        console.log('Update employee roles success')


        /*View all Employees by manager*/

      }else if (answers.userChoice === 'Add role'){
        console.log('Add role - success')
      }
      else if (answers.userChoice === 'Add department'){
        console.log('Add department - success')
      }
      else if (answers.userChoice === 'Update employee manager'){
        console.log('Update employee manager - success')
      }
      else if (answers.userChoice === 'Remove employee'){
        console.log('Remove employee - success')
      }
      else {
        endOfUse();
        console.log('Exit - success')

      }

    })
};

/**Here are the functions for all of the operations */
/**TO post joint tables with names, department roles and salary */
viewAll =()=>{
  connection.query("SELECT firstname, lastname, title, salary FROM employees INNER JOIN role ON employees.role_id=role.id", function(err, response) {
        if (err) throw err;
        console.table(response);   
    
  });
  
   
};

viewByDepartment =()=>{
  connection.query("SELECT firstname, lastname, name, manager FROM employees LEFT JOIN department ON employees.manager_id = department.id", function(err, response) {
        if (err) throw err;
        console.table(response);          
       
  });
  
  
  }

  viewByManager =()=>{
    connection.query("SELECT firstname, lastname, name, manager FROM employees LEFT JOIN department ON employees.manager_id = managers_id", function(err, response) {
          if (err) throw err;
          console.table(response); 
           
         
    });
  };

  updateRoles=()=>{
    

  }


endOfUse =()=>{
  console.log("Thank you for using our APP!")
 connection.end();
}