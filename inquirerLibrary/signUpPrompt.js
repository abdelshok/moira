// Prompt for sign up UX

'use strict';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require('firebase');
const SB = require
let signUpPrompt = () => {
    const questions = [ {
        name: 'email',
        type: 'input',
        message: 'Please enter your email address and press enter 👹',
        validate: (email) => {
            if (validateEmail(email)) {
                return true;
            } else {
                return 'Invalid email';
            }
        }
    }]
    inquirer.prompt(questions).then((answer)=> {
        const {email} = answer;
        followUpPasswordPrompt(email);
    })
}


let followUpPasswordPrompt = (email) => {
    const questions = [ 
        {
            name: 'password',
            type: 'password',
            message: 'Please type in your password and press enter 👀',
            validate: (password) => {
                var passwordLength = password.length;
                if (passwordLength >= 6) { // Add more validation later
                    return true
                } else {
                    return 'Password needs to be 6 characters or more'
                }
            }
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        const { password } = answer;
        passwordConfirmationPrompt(email, password);
    })
}

let passwordConfirmationPrompt = (email, password) => {
    const questions = [
        {
            name: 'confirmationPassword',
            type: 'password',
            message: 'Please type your password again for confirmation'
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        const { confirmationPassword } = answer;
        if (confirmationPassword === password) {
            // Sign up credentials can be confirmed, set up firebase
            firebase.default.auth().createUserWithEmailAndPassword(email, password)
            .then((response)=> {
                console.log(success('Account creation and connection successful'));
                try {
                    console.log(important('Successful connection'));
                    messageOrConnectPrompt(email);
                } catch(err) {
                    console.log(error('Unsuccessful connection to SB.'))
                }
            })
            .catch(function(err) {
                // Handle Errors here.
                console.log(error('Error encountered. User cannot be created'));
                const { message } = err;
                console.log(error(message));
            });
        } else {
            console.log(error("Passwords don't match"));
            signUpPrompt();
        }
    })
}

module.exports = {
    signUpPrompt,
}

// External Modules
const inquirer = require('inquirer');
// Internal Modules
//const { firebase } = require('../index.js')
const { error, success, important } = require('../chalkLibrary');
const { validateEmail } = require('../utilityLibrary/generalUtility');
const { messageOrConnectPrompt } = require('./messageOrConnectPrompt');