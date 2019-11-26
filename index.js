// index.js file is the entry point for the program

'use strict';

// External Packages
const clear = require('clear');
const figlet = require('figlet');
// const SendBird = require('sendbird');
// var sb = new SendBird({appId: '0eb29a7977a1616f453d45d553d920a451e40725'});
// Internal Modules
const { initialPrompt } = require('./inquirerLibrary/initialPrompt'); 
const { major } = require('./chalkLibrary');
require('dotenv').config();

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require('firebase');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

async function runMoira() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    clear();
    major(figlet.textSync('Welcome to Moira', { horizontalLayout: 'full'}));
    initialPrompt();
} 

module.exports = {
    runMoira,
    // sb
}
