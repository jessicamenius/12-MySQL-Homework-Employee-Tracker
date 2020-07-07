const mysql = require("mysql");
const connection = mysql.createConnection({
  // ...
});
const utils = require("utils");
connection.queryPromise = utils.promisify(connection.query);
const inquirer = require("inquirer");
function init() {
  inquirer
    .prompt([
      {
        name: "task",
        message: "What would you like to do? ",
        type: "list",
        choices: ["DISPLAY_EMPLOYEES", "ADD_EMPLOYEE"],
      },
    ])
    .then(function (message) {
      if (message.task == "DISPLAY_EMPLOYEES") {
        displayEmployees();
      }
      if (message.task == "ADD_EMPLOYEE") {
        // call the add employee function
        addEmployee();
      }
      // and so on...
    });
}
init();
async function displayEmployees() {
  var values = connection.queryPromise(
    `SELECT employee.first_name, employee.last_name, employee.department_id, department.id, department.name FROM employee INNER JOIN department ON employee.department_id=department.id`
  );
  console.table(values);
  init();
}
async function getDepartments() {
  return connection.queryPromise("SELECT id, name FROM department");
}
async function getManagers() {
  // getting all employees here instead of departments
  return connection.queryPromise(
    "SELECT id, first_name, last_name FROM employee"
  );
}
async function addEmployee() {
  // ask for their department, first_name, last_name, manager
  let departments = await getDepartments();
  departments = departments.map(({ id, name }) => {
    return {
      value: id,
      name,
    };
  });
  let managers = await getManagers();
  managers = managers.map(({ id, first_name, last_name }) => {
    return {
      value: id,
      name: `${first_name} ${last_name}`,
    };
  });
  managers.push({ value: "none", name: "None" });
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the employee's first name: ",
      },
      {
        type: "input",
        name: "first_name",
        message: "Enter the employee's last name: ",
      },
      {
        type: "list",
        name: "department_id",
        message: "Select the employee's department: ",
        choices: departments,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Select the employee's manager: ",
        choices: managers,
      },
    ])
    .then((employee) => {
      // create the employee using connection.query
      if (employee.manager_id === "none") {
        return connection.queryPromise(
          `INSERT INTO employee (first_name, last_name, department_id) VALUES (?, ?, ?)`,
          [employee.first_name, employee.last_name, employee.department_id]
        );
      } else {
        return connection.queryPromise(
          `INSERT INTO employee (first_name, last_name, department_id, manager_id) VALUES (?, ?, ? , ?)`,
          [
            employee.first_name,
            employee.last_name,
            employee.department_id,
            employee.manager_id,
          ]
        );
      }
    });
  init();
}
