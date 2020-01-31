const Employee = require("./employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.title = "Manager";
        this.officeNumber = officeNumber;
    }
    getOffice(){
        return this.officeNumber;
    }
}

module.exports = Manager;