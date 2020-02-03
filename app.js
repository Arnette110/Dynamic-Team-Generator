// requires
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const html = require("./templates/generateHTML");
const writeFile = util.promisify(fs.writeFile);
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
let teamArray = [];
let teamstr = "";

// function to retrieve data from the user
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
          validate: validateNumber,
        },
        {
          type: "input",
          message: "What is the Employee's Email?",
          name: "email",
          validate: validateEmail,
        },
      ]);
    //   prompts questions based on the title that was selected for the employee then creates an employee object and pushes it to the teamArray
      let response2 = "";
      if (response.title === "Manager") {
        response2 = await inquirer.prompt({
          type: "input",
          message: "What is your Office Number?",
          name: "officeNumber",
          validate: validateNumber,
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
}

// function to run the program
async function init() {
  try {
    //   wait to retrieve data from user input
    await getMainData();

    // loops through each employee title in teamArray and assigns related info to each employee per their title
    teamArray.forEach(employee => {
     
      let titleInfo;

      if (employee.title === "Manager") {
        titleInfo = `Office Number: ${employee.officeNumber}`;
      } else if (employee.title === "Engineer") {
        titleInfo = `GitHub Username: ${employee.github}`;
      } else if (employee.title === "Intern") {
        titleInfo = `School: ${employee.school}`;
      }

    //   creates an html card for each employee in array
      teamstr =
        teamstr +
        `<div class="column is-4">
                    <div class="card">
                        <header class="header
                        has-text-centered">
                        <h1 class="title is-uppercase">${employee.title}</h1></header>
                    
                        <div class="card-content">
                        <ul>
                            <li class="subtitle is-capitalized"><h2><i class="far fa-user fa-2x"></i>  ${employee.name}</h2></li>
                            <li class="subtitle">ID:  ${employee.id}</li>
                            <li class="subtitle">Email:  ${employee.email}</li>
                            <li class="subtitle is-capitalized">${titleInfo} </li>
                        </ul>
                        </div>
                    </div>
                </div>`;
    });

    const finalHTML = html.generateHTML(teamstr);
    // creates final html file and assigns it to the output folder
    writeFile("./output/index.html", finalHTML);
  } catch (err) {
    console.log(err);
  }
}
// call init function to run program
init();


// validation functions

// validates if an ID has already been selected for another employee
function compareId(teamArray, value) {
  let matchedPairs = teamArray.filter(function(employee) {
    // Filter will return the team member that matches the below condition when true
    return employee.id == value;
  });
  if (matchedPairs.length > 0) {
    console.log("\nId already Exists.");
    return false;
  } else return true;
}

// validates that the entered value is a number
function validateNumber(value) {
  let pattern = /^\d+$/;
  if (value.search(pattern) !== -1 && value.length > 0) {
    if (teamArray.length === 0) {
      return true;
    }
    return compareId(teamArray, value);
  } else {
    console.log("\nMust be a number");
    return false;
  }
}

// validates that the email is in a valid format
function validateEmail(value) {
  let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (value.search(pattern) !== -1 && value.length > 0) {
    return true;
  } else {
    console.log("\nMust be in email format (ie. test@test.com)");
    return false;
  }
}
