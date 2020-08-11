const mysql = require("mysql");
const connection = require("./config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

let department = [];
let roles = [];
let employees = [];

const updateDepartments = () => {
  department = [];
  getDepartments().then((res) => {
    console.table(res);
    res.forEach((element) => department.push(element.name));
    console.log(department);
  });
};

const getDepartments = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM department`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

updateDepartments();

const getEmployeeInfo = () => {
  `SELECT
    e.id id,
    e.first_name,
    e.last_name,
    CONCAT_WS(" ", e.first_name, e.last_name) Full_Name,
    e.role_id,
    roles.title,
    department.name,
    roles.salary,
    CONCAT_WS(" ", m.first_name, m.last_name) manager,
    e.manager_id
FROM
    employee e
LEFT JOIN employee m ON m.id = e.manager_id
LEFT JOIN roles ON e.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
ORDER BY e.id;`;
};

getEmployeeInfo();
