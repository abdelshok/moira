// Prompt for Login UX 

'use strict';

//// External Packages
const clear = require('clear');
//// Internal Modules
const { firebase } = require('../configurations/firebaseConfig');
// Firebase-related initializations or requires
//require("firebase/firestore");
const db = firebase.firestore(); // Database
// Constants
const { EMAIL_DB } = require('../env.js');


//// Firebase Functions 

// Function @retrieveUsernameFromFirebase
// Takes one parameter and returns a username string
// - email: string parameters
const retrieveUsernameFromFirebase = (email) => {
    if (email == '') {
        return false;
    } else {
        // #toFigureOut: Add logging for if the email is not of the correct format ?
        db.collection(EMAIL_DB).doc(email)
        .get()
        .then((querySnapshot) => {
            const userData = querySnapshot.data();
            // #toDisable
            // console.log('User data found', userData);
            const { username } = userData;
            // CreateOrRetrievePrompt should be called under here when the call is successful
            createOrRetrievePrompt(email, username);
        })
        .catch((returnedError) => {
            console.log(error('Error encountered within retrieveUsernameFromFirebase function', returnedError));
        });
    }
}
let loginPrompt = () => {
    const questions = [ {
        name: 'email',
        type: 'input',
        message: 'Please enter your email address and press enter 👹'
    }, {
        name: 'password',
        type: 'password',
        message: 'Please type in your password and press enter 🙈'
    }
    ]
    inquirer.prompt(questions).then((answer)=> {
        const {email, password} = answer;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log(success('User successfully logged into Firebase.'));
            try {
                clear();
                retrieveUsernameFromFirebase(email);
            } catch (err) {
                console.log(error('Input email prompt function call-related error'));
            }
        })
        .catch(function(err) {
            // Handle Errors here.
            console.log(error('Incorrect email or password information'));
            setTimeout(loginPrompt, 1200); // Gives the user time to process the notification
        });
    })
}

module.exports = {
    loginPrompt,
}

// External Modules
const inquirer = require('inquirer');
const { error, success } = require('../chalkLibrary');
const { createOrRetrievePrompt } = require('./createOrRetrievePrompt');
