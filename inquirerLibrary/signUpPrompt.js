// Prompt for sign up UX

'use strict';

// External Packages 
const clear = require('clear');

// Firebase App (the core Firebase SDK) is always required and must be listed before other Firebase SDKs
// Initialization
const { firebase } = require('../configurations/firebaseConfig');
const db = firebase.firestore();
// Constants 
const { USERNAME_DB, EMAIL_DB } = require('../env.js');

// Firebase Functions (below)
// Initially created a firebase folder in which I declared the firebase functions that will be used within this project
// but quickly realized that those firebase functions would be calling the inquirer functions below within their own 
// callbacks. Importing the correct inquirer functions would have been a solution, but I believe that keeping them in separate
// folders would make the relationship between the firebase and inquirer functions unclear.
// In this case, we sacrificed organization for the sake of clarity. Or did we?

// @addEmailKeyAndUsernameToFirebase
// Inputs (2):
// - username: string
// - email: string
const addEmailKeyAndUsernameToFirebase = (username, email, phoneNumber) => {
    if (username == '' ||  email == '') {
        return false; 
    } else {
        // Retrieves username from 'Users' database in Firestore
        db.collection(EMAIL_DB).doc(email).set({
            username: username,
            phoneNumber: phoneNumber
        })
        .then(() => {
            // Triggers the corresponding prompt which allows the user to either create a channel
            // or retrieve a list of open channels
            addUsernameKeyAndEmailToFirebase(username, email, phoneNumber);
        })
        .catch((returnedError) => {
            console.error('Error caught within addEmailKeyAndUsernameToFirebase function', returnedError);
        })
    }
}

// @addUsernameKeyAndEmailToFirebase
// Inputs (2):
// - username: string
// - email: string
const addUsernameKeyAndEmailToFirebase = (username, email, phoneNumber) => {
    if (username == '' || email == '') {
        return false;
    } else {
        db.collection(USERNAME_DB).doc(username).set({
            email: email,
            phoneNumber: phoneNumber
        })
        .then(() => {
            // console.log('Username correctly added to username list');
            // Only call the prompt when both the username and email have been added to the two
            // different databases
            createOrRetrievePrompt(email, username);
        })
        .catch((returnedError) => {
            console.error(error('Username not added to username_list', returnedError));
        })
    }
}

// @findIfUsernameExists
// Queries the Firebase database to determine whether or not the username already exists
// Input (1):
// - username (string)
// Output: 
// - None. Calls the correct functions in the scenario that the username exists and the case
// where the username does not exist
function findIfUsernameExists(email, username) {
    if (username == '') {
        return false;
    } else {
        // Retrieves whether the username exists or not
        db.collection(USERNAME_DB).doc(username)
        .get()
        .then((querySnapshot) => {
            const userData = querySnapshot.data();
            const { username } = userData;
            console.log(major('Username already exists please choose a different username'));
            usernamePrompt(email, username);
        })
        .catch(() => {
            // If an error is reached, then the username does not exist in the database
            // therefore, we can move to the next step: password validation.
            // #toDisable
            // console.error(success('Username does not exist yet'));
            phoneNumberPrompt(email, username)
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
            message: "Now enter your username. 👀"
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        const { username } = answer;
        findIfUsernameExists(email, username);
    })
}

let phoneNumberPrompt = (email, username) => {
    const questions = [
        {
            name: 'phoneNumber',
            type: 'input',
            message: 'And your phone number 🏮 '
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        const { phoneNumber } = answer;
        followUpPasswordPrompt(email, username, phoneNumber);
    })
}

let followUpPasswordPrompt = (email, username, phoneNumber) => {
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
        passwordConfirmationPrompt(email, password, username, phoneNumber);
    })
}

let passwordConfirmationPrompt = (email, password, username, phoneNumber) => {
    const questions = [
        {
            name: 'confirmationPassword',
            type: 'password',
            message: 'Please type your password again for validation. 🔥'
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

                    setTimeout(() => {
                        clear();
                        addEmailKeyAndUsernameToFirebase(username, email, phoneNumber);
                    }, 1000) 

                } catch(err) {
                    console.log(error('Unsuccessful connection to openSB.'))
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
    addEmailKeyAndUsernameToFirebase, // Exported here so that we can do some testing later 
}

// External Modules
const inquirer = require('inquirer');
// Internal Modules
//const { firebase } = require('../index.js')
const { error, success, important, major } = require('../chalkLibrary');
const { validateEmail } = require('../utilityLibrary/generalUtility');
const { createOrRetrievePrompt } = require('./createOrRetrievePrompt');
const { initialPrompt } = require('./initialPrompt')