const mysql = require("mysql");
const connection = require("./config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

function mainMenu() {
    inquirer.prompt ([
        {
        name: "mainMenu",
        message: "What would you like to do?",
        type: "list",
        choices = [
            "View all employees",
            "View all roles",
            "View all departments",
        ],
    }
]).then(function(message){
        if(message.mainMenu === "View all employees"){
            displayEmployees();
        }
    })
    mainMenu();
}


function displayEmployees() {
  connection.queryPromise("SQL DATA").then((values) => {
    // use a loop or forEach function to displaay the employee and its table and department

    console.table(values);
    mainMenu()
  });
}

async function getDepartments(){
return connection.queryPromise("SELECT id, name FROM department")
}

function getManagers(){

    // get all employees here instead of departments

    return connection.queryPromise("SELECT id, first_name, last_name FROM employee")

}

async function addEmployee(){

    // ask for their department, first_name, last_name, manager

    let departments = await getDepartments();
    departments = departments.map(({id, name})=> {
        return{
            value: id,
            name,
        }
    })

    let managers = await getManagers();
    managers = managers.map (({id, first_name, last_name})=>
    return {
        value: id,
        name:
    })

    inquirer.prompt([
        {
        type: "input",
        name: "first_name",
        message: "Enter employee's first name",
    },
    {
        type: "input",
        name: "last_name",
        message: "Enter employee's last name",
    },
    {
        type: "list",
        name: "department_id",
        message: "Select the employee's department",
        choices: departments,
    },
    {
        type: "list",
        name: "manager_id",
        message: "Select the employee's manager",
        choices: managers,
    },
]).then(managers) => {
        // create the employee using connection.query

        connection.query("INSERT INTO employee (first_name, last_name, department_id, manager_id) VALUES (?, ?, ?, ?)", [employe.first_name, employee.last_name])
    }
}
