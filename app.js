const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
// const generateHTML = require("./generateHTML");
const writeFile = util.promisify(fs.writeFile);

const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
let teamArray = [];

async function getMainData() {
  try {
    let response = await inquirer.prompt([
      {
        type: "input",
        message: "What is the Employee's Name?",
        name: "employeeName",
      },
      {
        type: "input",
        message: "What is the Employee's ID?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the Employee's Email?",
        name: "email",
      },
      {
        type: "list",
        message: "What is the Employee's Title?",
        name: "title",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ]);
    let response2 = "";
    if (response.title === "Manager") {
      response2 = await inquirer.prompt({
        type: "input",
        message: "What is your Office Number?",
        name: "officeNumber",
      });
      const manager = new Manager(
        response.employeeName,
        response.id,
        response.email,
        response2.officeNumber,
      );
      teamArray.push(manager);
    } else if (response.title === "Engineer") {
      response2 = await inquirer.prompt({
        type: "input",
        message: "What is your GitHub Username?",
        name: "github",
      });
      const engineer = new Engineer(
        response.employeeName,
        response.id,
        response.email,
        response2.github,
      );
      teamArray.push(engineer);
    } else if (response.title === "Intern") {
      response2 = await inquirer.prompt({
        type: "input",
        message: "What is the name of your School?",
        name: "school",
      });
      const intern = new Intern(
        response.employeeName,
        response.id,
        response.email,
        response2.school,
      );
      teamArray.push(intern);
    };
    
  } catch (err) {
    console.log(err);
  }
  console.log(teamArray);
}
getMainData();
