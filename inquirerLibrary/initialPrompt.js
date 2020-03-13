// Initial Prompt that starts the whole application

'use strict';

// External Packages
const clear = require('clear');

let initialPrompt = () => {
    const questions = [
        {
            name: 'WelcomeUserPrompt',
            message: 'LMFAO \n \n 🙊 \n \n 🙉 \n \n 🙈 \n \n \n Your NPM chat app for the terminal. Please press enter. \n'
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
            message: "Make your pick 💀 \n",
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
            clear();
            loginPrompt();
        } else if (initialUserSelection === 'Sign Up') {
            // Sign up prompts
            clear();
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
