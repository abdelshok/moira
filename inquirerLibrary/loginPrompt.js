// Prompt for login UX

'use strict';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
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
        console.log('User email is', email);
        console.log('User password is', password);
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log(success('User successfully logged in.'));
        })
        .catch(function(err) {
            // Handle Errors here.
            console.log(error('Incorrect email or password information'));
            setTimeout(loginPrompt, 2000);
        });
    })
}


module.exports = {
    loginPrompt,
}

// External Modules
const inquirer = require('inquirer');
const { error, success } = require('../chalkLibrary');