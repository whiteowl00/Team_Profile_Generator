const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// const Choices = require("inquirer/lib/objects/choices");



let employeeRoster = [];

const managerQuestion = [
    {
        type: "input",
        name: "managername",
        message: "What is the manager's name?",
    }, {
        type: "input",
        name: "managerid",
        message: "What is the manager's id number?"
    }, {
        type: "input",
        name: "manageremail",
        message: "What is the manager's email?"
    }, {
        type: "input",
        name: "officenumber",
        message: "What is the manager's office number?"
    }
];

const engineerQuestion = [
    {
        type: "input",
        name: "engineername",
        message: "What is the engineer's name?",
    }, {
        type: "input",
        name: "engineerid",
        message: "What is the engineer's id number?"
    }, {
        type: "input",
        name: "engineeremail",
        message: "What is the engineer's email?"
    }, {
        type: "input",
        name: "githubname",
        message: "What is the engineer's GitHub username?"
    }
]

const internQuestion = [
    {
        type: "input",
        name: "internname",
        message: "What is the intern's name?",
    }, {
        type: "input",
        name: "internid",
        message: "What is the intern's id number?"
    }, {
        type: "input",
        name: "internemail",
        message: "What is the intern's email?"
    }, {
        type: "input",
        name: "schoolname",
        message: "What school does the intern's attend?"
    }
]

const list = [{
    type: "list",
    name: "EmployeeType",
    choices: [
        "Manager",
        "Engineer",
        "Intern",
        "Exit"
    ],
    message: "Please select your new hire."
}]

const promptSelection = () => {
    inquirer.prompt(list).then(answer => {
        switch (answer.EmployeeType) {
            case "Manager": promptManager(); break;
            case "Engineer": promptEngineer(); break;
            case "Intern": promptIntern(); break;
            default: generateHtml();
        }
    })
}

const promptManager = () => {
    inquirer.prompt(managerQuestion).then(answer => {
        employeeRoster.push(new Manager(answer.managername, answer.managerid, answer.manageremail, answer.officenumber));
        promptSelection();
    })
}

const promptEngineer = () => {
    inquirer.prompt(engineerQuestion).then(answer => {
        employeeRoster.push(new Engineer(answer.engineername, answer.engineerid, answer.engineeremail, answer.githubname));
        promptSelection();
    })
}

const promptIntern = () => {
    inquirer.prompt(internQuestion).then(answer => {
        employeeRoster.push(new Intern(answer.internname, answer.internid, answer.internemail, answer.schoolname));
        promptSelection();
    })
}

const generateHtml = () => {
    fs.writeFile(outputPath, render(employeeRoster), (err) => {
        if (err) throw err;
        console.log('File saved at ' + outputPath);
    })
}

promptSelection();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
