// Prompt for sign up UX

'use strict';

// External Packages 
const clear = require('clear');

// Firebase App (the core Firebase SDK) is always required and must be listed before other Firebase SDKs

// Initialization
const { firebase } = require('../configurations/firebaseConfig');
require("firebase/firestore");
const db = firebase.firestore();

// Firebase Functions (below)
// Initially created a firebase folder in which I declared the firebase functions that will be used within this project
// but quickly realized that those firebase functions would be calling the inquirer functions below within their own 
// callbacks. Importing the correct inquirer functions would have been a solution, but I believe that keeping them in separate
// folders would make the relationship between the firebase and inquirer functions unclear.
// In this case, we sacrificed organization for the sake of clarity. Or did we?

// Function @addUsernameAndEmailToFirebase
// Two parameters:
// - username: string
// - email: string
const addUsernameAndEmailToFirebase = (username, email) => {
    if (username == '' &&  email == '') {
        return false; 
    } else {
        // #toDisable
        console.log('Username and email will be stored in the corresponding database');
        db.collection('users').doc(email).set({
            username: username
        })
        .then(() => {
            // #toDisable
            console.log('Username and email successfully added to the database');
            // after this, you call the next function and pass it the username, and you also
            // get rid of the user name prompt,
            createOrRetrievePrompt(email, username);
            // after that, what you do is that during the login you actually fetch the databsae
            // and try to get the user login

        })
        .catch((returnedError) => {
            console.error('Error caught within addUsernameAndEmailToFirebase function', returnedError);
        })
    }
}

// Inquirer Functions
// Used to interact with the CLI and gather user information
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
        usernamePrompt(email);
    })
}

let usernamePrompt = (email) => {
    const questions = [
        {
            name: 'username',
            type: 'input',
            message: "Now enter your username, bruh. 👀"
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        const { username } = answer;
        // #todisable
        console.log(`Username chosen is ${username}`);
        followUpPasswordPrompt(email, username);
    })
}

let followUpPasswordPrompt = (email, username) => {
    const questions = [ 
        {
            name: 'password',
            type: 'password',
            message: 'Please type in your password and press enter 🙈',
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
        passwordConfirmationPrompt(email, password, username);
    })
}

let passwordConfirmationPrompt = (email, password, username) => {
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
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response)=> {
                console.log(success('Account creation and connection successful'));
                try {
                    console.log(important('Successful connection'));
                    // #toDisable
                    console.log('Calling function that will add username to firestore');
                    addUsernameAndEmailToFirebase(username, email);
                } catch(err) {
                    console.log(error('Unsuccessful connection to SB.'))
                }
            })
            .catch(function(err) {
                // Handle Errors here.
                console.log(error('Error encountered. User cannot be created'));
                const { message } = err;
                console.log(error(message));
                console.log(error('You will be redirected to the login / sign up page in a few seconds'));
                setTimeout(() => {
                    clear();
                    setTimeout(initialPrompt, 500)
                }, 3000);
            });
        } else {
            console.log(error("Passwords don't match"));
            signUpPrompt();
        }
    })
}

module.exports = {
    signUpPrompt,
    addUsernameAndEmailToFirebase, // Exported here so that we can do some testing later 
}

// External Modules
const inquirer = require('inquirer');
// Internal Modules
//const { firebase } = require('../index.js')
const { error, success, important } = require('../chalkLibrary');
const { validateEmail } = require('../utilityLibrary/generalUtility');
const { createOrRetrievePrompt } = require('./createOrRetrievePrompt');
const { initialPrompt } = require('./initialPrompt')