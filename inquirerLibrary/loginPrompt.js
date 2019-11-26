// Prompt for login UX

'use strict';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
//const firebase = require('../modules/firebase');

const firebase = require('firebase');

let loginPrompt = () => {
    const questions = [ {
        name: 'email',
        type: 'input',
        message: 'Please enter your email address or username and press enter 👽'
    }, {
        name: 'password',
        type: 'password',
        message: 'Please type in your password 👀'
    }
    ]
    inquirer.prompt(questions).then((answer)=> {
        const {email, password} = answer;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log(success('User successfully logged into Firebase.'));
            try {
                console.log('Email passed to the inputHandlePrompt', email);
                messageOrConnectPrompt(email);
            } catch (err) {
                console.log(error('Input email prompt function call-related error'));
            }
        })
        .catch(function(err) {
            // Handle Errors here.
            console.log(error('Incorrect email or password information'));
            setTimeout(loginPrompt, 2000); // Gives the user time to process the notification
        });
    })
}


module.exports = {
    loginPrompt,
}

// External Modules
const inquirer = require('inquirer');
const { error, success } = require('../chalkLibrary');
const { inputHandlePrompt } = require('./messagePrompt');
const { messageOrConnectPrompt } = require('./messageOrConnectPrompt');
