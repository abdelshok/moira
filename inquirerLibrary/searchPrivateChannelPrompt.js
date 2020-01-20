// Prompt that will allow the user to search 

'use strict ';

// External Packages
const clear = require('clear');
// Inquirer-related Modules
const { messageOrConnectPrompt } = require('./messageOrConnectPrompt');
// Firebase App Initialization
const { firebase } = require('../configurations/firebaseConfig');
const db = firebase.firestore();
// Constants
const privateChannel = 'private';
const { PRV_DB } = require('../env.js');


const findIfUserExists = (channelUsers, email) => {
    for (let i=0; i<channelUsers.length; i++) {
        let userEmail = channelUsers[i];
        if (userEmail === email) {
            // Then one of the emails in the list matches the current user's which implies 
            // that the user's email is already added to the array
            return true;
        }
    }

    return false;
}
// @processGroupChannelData
// - Checks if user already added to private channel's list of existing users
// - If user is not in channel's list, then add him / her in database array
// - If user already exists, then simply allow the user to log it directly to message other users
const processGroupChannelData = (channelName, userEmail, channelUrl, username, privateChannel) => {
    db.collection(PRV_DB).doc(channelName)
    .get()
    .then((querySnapshot) => {
        const channelData = querySnapshot.data();
        const { channelUsers } = channelData;
        const doesUserExist = findIfUserExists(channelUsers, userEmail);
        if (doesUserExist === true) {
            // If user exists in channel's list of users, then we move to the next step
            // #toDisable
            // console.log('User already exists in private channel list');
            messageOrConnectPrompt(email, channelName, channelUrl, username, privateChannel);
        } else {
            // We make the necessary firebase call to add the user to the list
            // #toDisable
            // console.log('Calling firebase function to add user to channel list @processGroupChannelDatai');
            addUserEmailToChannelUserList(channelName, userEmail, channelUrl, username, privateChannel);
        }
    })
}

// Firebase functions 

// @findIfChannelExists :
// - Finds if the channel name exists, 
// Inputs (1)
// - channelName: string
// Output: 
// - Returns the name of the channel and it's password.
// - Calls the privateChannelPrompt if successful
const findIfChannelExists = (channelName, email, username) => {
    if (channelName === '') {
        console.log(error('Channel name is empty. Please type a channel name.'));
        typeInPrivateChannelNamePrompt();
    } else { // #toDO: move all the database names within process.env
        db.collection(PRV_DB).doc(channelName) // Will be modified to private_channels_list after
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

// @addUserEmailToChannelUserList
// - Adds user to channel user list in firebase
const addUserEmailToChannelUserList = (channelName, userEmail, channelUrl, username, privateChannel) => {
    // We assume here that the channelName given is always going to be a
    // non-empty string
    if (channelName === '') {
        console.log('Channel name is empty. Error in the @addUserEmailToChannelUserList');
        // #important: where to log errors? Need to send error logs somewhere so that users don't see them
    } else {
        db.collection(PRV_DB).doc(channelName)
        .update({
            channelUsers: firebase.firestore.FieldValue.arrayUnion(userEmail)
        })
        .then(() => {
            console.log(success('User successfully added to channel user array'));
            messageOrConnectPrompt(userEmail, channelName, channelUrl, username, privateChannel);
        })
    }
}

let typeInPrivateChannelNamePrompt = (email, username) => {
    const questions = [
        {
            name: 'privateChannelName',
            message: 'Type in the name of the private channel 🌍',
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
            message: 'Now type in the password of the channel to enter it 🙉',
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

            // Password entered successfully
            // 1. Check if user already exists in channelGroup user list
            // 2. If user already in it, simply connect the user
            // 3. If user is not in user list, then add user to user list
            processGroupChannelData(channelName, email, channelUrl, username, privateChannel);
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
const { error, success } = require('../chalkLibrary');