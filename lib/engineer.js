const Employee = require("./employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.title = "Engineer";
    this.github = github;
  }
  getGithub() {
    return this.github;
  }
  getRole()
{
    return this.title;
}}

module.exports = Engineer;
