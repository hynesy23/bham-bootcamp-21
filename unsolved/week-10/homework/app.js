const inquirer = require("inquirer");
const fs       = require("fs");

const generateHTML = require("./src/generateHTML");
const writeToFile  = require('./src/writeToFile');
const createEngineer = require('./src/utils/createEngineer')
const Manager = require("./lib/manager");

const managerQuestions = [
    {
      type: "input",
      message: "What is the name of your team?",
      name: "teamName",
    },
    {
      type: "input",
      message: "What is your name?",
      name: "name",
    },
    {
      type: "input",
      message: "What is your employeeID?",
      name: "id",
    },
    {
      type: "input",
      message: "What is your email?",
      name: "email",
    },
    {
      type: "input",
      message: "What is your office number?",
      name: "officeNumber",
    }
];

const getManagerAnswers = async () => {
    const answers = await inquirer.prompt(managerQuestions);
    return answers;
}

const addTeamMembers = async () => {
    const teamQuestions = [
        {
            type: "list",
            name: "memberChoice",
            message: "Which type of team member would you like to add?",
            choices: [
              "Engineer",
              "Intern",
              "No more"
            ]
          }
    ]

    const answers = await inquirer.prompt( teamQuestions );

    return answers;
}

const createTeam = async ( ) => {
  let team = [];
  let inProgress = true

  while( inProgress )
  {
      let teamChoice = await addTeamMembers( )
      if ( teamChoice.memberChoice === "No more" )
      {
          inProgress = false
      }
      else 
      {
          if( teamChoice.memberChoice === "Engineer" )
          {
              const engineer = await createEngineer( )
              console.log( 'hello ', engineer)
              team.push( engineer );
          }
      }
  }

  return team;
}

const app = async () => {
    console.log('App has started');

    const team = [];

    const managerAnswers = await getManagerAnswers();

    const manager = new Manager( managerAnswers );

    team.push( manager );

    const teamMembers = await createTeam( )

    team.push( ...teamMembers );

    console.log( team, 'team log' );

    // const data = generateHTML( team );

    // console.log('Data obtained');

    // writeToFile( data );
}


module.exports = app;