// Initial Prompt that starts the whole application

'use strict';

let initialPrompt = () => {
    const questions = [
        {
            name: 'WelcomeUserPrompt',
            message: 'Welcome to Moira \n \n 🌙 \n \n \n Please press enter. \n'
        }
    ]
    inquirer.prompt(questions).then(() => {
        userOptionsPrompt();
    })
}

let userOptionsPrompt = () => {
    const questions = [
        {
            name: 'initialUserSelection',
            type: 'list',
            message: "Pick your poison 💀",
            choices: [
                'Login',
                'Sign Up'
            ]
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        const { initialUserSelection } = answer;
        if (initialUserSelection === 'Login') {
            // Login Prompts
            loginPrompt();
        } else if (initialUserSelection === 'Sign Up') {
            // Sign up prompts
            signUpPrompt();
        } 
    })
}

module.exports = {
    initialPrompt,
} 

// External Modules
const inquirer = require('inquirer');
// Internal Modules
const { loginPrompt } = require('./loginPrompt');
const { signUpPrompt } = require('./signUpPrompt');
