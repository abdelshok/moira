// index.js file is the entry point for the program

'use strict';

// External Packages
// const firebase = require('firebase');
const clear = require('clear');
const figlet = require('figlet');
// Internal Modules
const { initialPrompt } = require('./inquirerLibrary/initialPrompt'); 
const { major } = require('./chalkLibrary');

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs

async function runMoira() {
    // Initialize Firebase
    clear();
    major(figlet.textSync('Welcome to Moira', { horizontalLayout: 'full'}));
    initialPrompt();
} 

module.exports = {
    runMoira
}
