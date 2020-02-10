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
        console.log("success")
        viewAll();
        /*View all employees by department*/
      } else if(answers.userChoice === 'View All Employees by Department'){
        console.log('Add role success')


        /*View all Employees by manager*/

      } else if (answers.userChoice === 'Add role'){
        console.log('Add role - success')
      }
    })
};


/**TO post joint tables with names, department roles and salary */
viewAll =()=>{
  connection.query("SELECT firstname, lastname, title, salary FROM employees INNER JOIN role ON employees.role_id=role.id ", function(err, response) {
        if (err) throw err;
        console.table(response);   
  
  });
  onStart();
   connection.end();
};

