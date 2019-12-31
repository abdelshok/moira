// Prompt that will allow the user to search 

'use strict ';

// External Packages
const clear = require('clear');
// Inquirer-related Modules
const { messageOrConnectPrompt } = require('./messageOrConnectPrompt');
// Firebase App Initialization
const { firebase } = require('../configurations/firebaseConfig');
const db = firebase.firestore();

// Firebase functions 

// @findIfChannelExists 
// Inputs (1)
// - channelName: string
// Output: 
// None - calls the next prompt.
const findIfChannelExists = (channelName, email, username) => {
    if (channelName === '') {
        console.log(error('Channel name is empty. Please type a channel name.'));
        typeInPrivateChannelNamePrompt();
    } else { // #toDO: move all the database names within process.env
        db.collection('private_channels_list').doc(channelName) // Will be modified to private_channels_list after
        .get()
        .then((querySnapshot) => {
            const channelData = querySnapshot.data();
            // Destructure the variables here because for some reason it does not work in the next function
            const { channelPassword, channelUrl } = channelData;
            if (channelData === undefined) {
                console.log(error('Channel does not exist.'));
                typeInPrivateChannelNamePrompt()
            } else {
                // We found the channel, so now it is time to check whether the password entered matches the one that the user 
                // is going to type in
                typeInPrivateChannelPassword(channelName, channelUrl, channelPassword, email, username);
            }
        })
        .catch((returnedError) => {
            console.log(error('Private channel not found in the database'));
            typeInPrivateChannelNamePrompt()
        })
    }
}


let typeInPrivateChannelNamePrompt = (email, username) => {
    const questions = [
        {
            name: 'privateChannelName',
            message: 'Type in the name of the private channel',
            type: 'input'
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        let { privateChannelName } = answer;
        findIfChannelExists(privateChannelName, email, username);
    })
}

// Argument 'channelData' represents the channel data returned by firebase
// It is an object with two properties, the channelUrl, and the channelPassword
let typeInPrivateChannelPassword = (channelName, channelUrl, channelPassword, email, username) => {
    const questions = [
        {
            name: 'typedInPassword',
            message: 'Now type in the password of the channel to enter it',
            type: 'password',
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        let { typedInPassword } = answer;
        // Here we check if the two passwords matches in order to let the user in
        if (channelPassword === typedInPassword) {
            // Passwords match, so now we don't need to pass it down anymore, the only information
            // we need to be able to connect to the channel is the user email, the channel name, the channel url
            // and the username 
            messageOrConnectPrompt(email, channelName, channelUrl, username);
        } else {
            console.log(error('Password entered is incorrect'));
            typeInPrivateChannelPassword(channelName, channelUrl, channelPassword, email, username);
        }
    })
}

module.exports = {
    typeInPrivateChannelNamePrompt
}




// External Modules
const inquirer = require('inquirer');
// Internal Modules
const { error } = require('../chalkLibrary');