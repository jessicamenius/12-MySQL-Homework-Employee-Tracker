const mysql = require("mysql");
const connection = require("./config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "Remove Employee",
            value: "REMOVE_EMPLOYEE",
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES",
          },
          {
            name: "Add Role",
            value: "ADD_ROLE",
          },
          {
            name: "Remove Role",
            value: "REMOVE_ROLE",
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT",
          },
          {
            name: "Remove Department",
            value: "REMOVE_DEPARTMENT",
          },
          {
            name: "Quit",
            value: "QUIT",
          },
        ],
      },
    ])
    .then((res) => {
      switch (res.mainMenu) {
        case "VIEW_EMPLOYEES":
          return displayEmployees();
        case "ADD_EMPLOYEE":
          return addEmployee();
        case "REMOVE_EMPLOYEE":
          return removeEmployee();
        case "VIEW_ROLES":
          return viewRoles();
        case "ADD_ROLE":
          return addRole();
        case "REMOVE_ROLE":
          return removeRole();
        case "VIEW_DEPARTMENTS":
          return viewDepts();
        case "ADD_DEPARTMENTS":
          return addDept();
        case "REMOVE_DEPARTMENTS":
          return removeDept();
        default:
          return quit();
      }
    });
}

mainMenu();

const displayEmployees = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM employees", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
    console.table(displayEmployees);
    mainMenu();
  });
};

const addEmployee = () => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO employee SET ?", [{}]);
  });
};

const quit = () => {
  console.log("Goodbye!");
  process.exit();
};
