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
         'Add employee',
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

      }else if (answers.userChoice === 'Add employee'){
        console.log('Add employee - success')
        AddEmployee();
        onStart();
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
//********************************** */
  updateRoles=()=>{

  connection.query("SELECT * FROM employees", function(err, results){
    if(err) throw err;

    inquirer.
        prompt([{
          name:"choice",
          type:"rawlist",
          choices: function(){
            var choiceArray =[];
            for (var i=0; i < results.length; i++){
              choiceArray.push(results[i].lastname);
            }
            return choiceArray;
          },
          message:"Please choose last name of the person"
        },
        {
          type:"input",
          name:"newRoleId",
          message:"Type new role ID"
        }
      ])
      .then (function(answer){
        var chosenLast;
        for (var i=0; i<results.length; i++){
          if(results[i].lastname===answer.choice){
            chosenLast = results[i];
          }
        }


      })
  })    

  }
//********************************* */
  AddEmployee =()=>{
    console.log("Let's add employee")
    inquirer
      .prompt([
        {
          type:"input",
          message:"Please enter first name",
          name:"first"
        },
        {
          type:"input",
          message:"Please enter last name",
          name:"last"
        },
        {
          type:"input",
          message:"Please enter role id",
          name:"roleId",
          validate: function(value){
            if(isNaN(value)===false){
              return true;
            }
            return false;
          }
        },
        {
          type:"input",
          message:"Please enter manager's id",
          name:"managersId",
          validate: function(value){
            if(isNaN(value)===false){
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(response){
        connection.query(
          "INSERT INTO employees SET ?",
          {
            firstname: response.first,
            lastname:response.last,
            role_id:response.roleId,
            manager_id:response.managersId || 0
          },
          function(err){
            if (err) throw err;
            console.log("Your new employee was added successfully!")
          }
        );
      });
  };
  


endOfUse =()=>{
  console.log("Thank you for using our APP!")
 connection.end();
}