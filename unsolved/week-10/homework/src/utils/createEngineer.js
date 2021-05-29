const inquirer = require("inquirer");

const Engineer = require('../../lib/engineer');

const createEngineer = async ( ) => {
    const engineerQuestions = [
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?",
            validate: answer => {
              if (answer !== "") {
                return true;
              }
              return "Please enter at least one character.";
            }
          },
          {
            type: "input",
            name: "id",
            message: "What is your engineer's id?"
          },
          {
            type: "input",
            name: "email",
            message: "What is your engineer's email?",
            validate: answer => {
              const pass = answer.match(
                /\S+@\S+\.\S+/
              );
              if (pass) {
                return true;
              }
              return "Please enter a valid email address.";
            }
          },
          {
            type: "input",
            name: "gitHub",
            message: "What is your engineer's GitHub username?",
            validate: answer => {
              if (answer !== "") {
                return true;
              }
              return "Please enter at least one character.";
            }
          }
    ]

    const { name, id, email, gitHub } = await inquirer.prompt(engineerQuestions);
    const engineer = new Engineer( name, id, email, gitHub );
    
    console.log(engineer, 'engineer log')
    return engineer;
}

module.exports = createEngineer;