// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs       = require("fs");

// console.log(inquirer)

const questions = [
    {
      type: "input",
      message: "What is the title of this README?",
      name: "title",
    },
    {
      type: "input",
      message: "What is the badge?",
      name: "badge",
    },
    {
      type: "input",
      message: "What is the description?",
      name: "description",
    },
    {
      type: "input",
      message: "What is the Table of Contents?",
      name: "tableOfContents",
    },
    {
      type: "input",
      message: "What is the intsallation process?",
      name: "installation",
    },
    {
      type: "input",
      message: "How do you use it?",
      name: "usage",
    },
    {
      type: "input",
      message: "What are the licenses?",
      name: "license",
    },
    {
      type: "input",
      message: "Who are the contributors?",
      name: "contributor",
    },
    {
      type: "input",
      message: "Have you used any tests?",
      name: "test",
    }
  ];

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, function (err) {
        if (err) return console.log(err, 'Could not create file');
        console.log('Success! File created');
    })
};

const getAnswers = async () => {
    const answers = await inquirer.prompt(questions);
    return answers;
}

// TODO: Create a function to initialize app
const init = async () => {
    const answers = await getAnswers();
    const data = `
    ## Description

    ${answers.title}

    ## Description

    ${answers.description}
    
    ## Table of Contents

    ${answers.tableOfContents}

    ## Installation
    
    ${answers.installation}
    
    ## Usage

    ${answers.usage}

    `

    // console.log(data)
    writeToFile('README.md', data)
};

// Function call to initialize app
init();
