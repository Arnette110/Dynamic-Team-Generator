const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const html = require("./templates/generateHTML");
const writeFile = util.promisify(fs.writeFile);

// const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
let teamArray = [];
let teamstr = "";

async function getMainData() {
  let done = "";
  do {
    try {
      let response = await inquirer.prompt([
        {
          type: "list",
          message: "What is the Employee's Title?",
          name: "title",
          choices: ["Manager", "Engineer", "Intern"],
        },
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
      }
    } catch (err) {
      console.log(err);
    }
    done = await inquirer.prompt({
      type: "list",
      message: "Would you like to continue?",
      name: "finished",
      choices: ["Yes", "No"],
    });
  } while (done.finished === "Yes");
  return teamArray;
}

async function init() {
  try {

    await getMainData();

    teamArray.forEach(employee => {
      console.log(employee);
      let titleInfo;

      if (employee.title === "Manager") {
        titleInfo = `Office Number is ${employee.officeNumber}`;
      } else if (employee.title === "Engineer") {
        titleInfo = `github user is ${employee.github}`;
      } else if (employee.title === "Intern") {
        titleInfo = `school is ${employee.school}`;
      }

      teamstr =
        teamstr +
        `<div class="column is-4">
                    <div class="card">
                        <header class="header
                        has-text-centered">
                        <h1 class="title is-uppercase">${employee.title}</h1></header>
                    
                        <div class="card-content is-capitalized">
                        <ul>
                            <li class="subtitle"><h2><i class="far fa-user fa-2x"></i>  ${employee.name}</h2></li>
                            <li class="subtitle">ID:  ${employee.id}</li>
                            <li class="subtitle">Email:  ${employee.email}</li>
                            <li class="subtitle">${titleInfo} </li>
                        </ul>
                        </div>
                    </div>
                </div>`;
    });

    
    const finalHTML = html.generateHTML(teamstr);

    writeFile("./output/index.html", finalHTML);

  } catch (err) {
    console.log(err);
  }
}
init();
