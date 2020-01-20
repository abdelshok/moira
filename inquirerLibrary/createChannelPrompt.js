// Prompt that allows the current user to create a new channel that they
// can use to speak with, with their friends, it will also link to another prompt 
// which will allow the user to create a password for the channel and set it before
// before inviting other users

'use strict';

// External Packages
// Internal Modules
const { openSB } = require('../configurations/sendbirdOpen');
const { privateSB } = require('../configurations/sendbirdPrivate');
const { success, error } = require('../chalkLibrary'); // We import the success type of log in order to use it to notify the user the channel is created successfully
const clear = require('clear');
const { firebase } = require('../configurations/firebaseConfig');
// Constants
const { OPEN_DB, PRV_DB } = require('../env.js');

// These two variables are passed down to the @createChanneLWithSendbird function
// at the end of the file in order to let it know whether the channel create is going
// to be open or private
const openChannel = 'open'
const privateChannel = 'private'

// Firebase Database
const db = firebase.firestore();

// Firebase Functions
const addOpenChannelToFirebase = async (channelName, channelUrl, email, username) => {
    db.collection(OPEN_DB).doc(channelName)
    .set({
        channelUrl: channelUrl,
    }).then((docRef) => {
        // #toDisable
        // console.log(success('Channel successfully created'));
        setTimeout(() => {
            clear();
            setTimeout(() => {
                postCreateChannelPrompt(channelName, email, channelUrl, username, openChannel); // Might be bad to
            }, 1000) // have constants here for openChannel and privateChannel
        }, 0)
    }).catch((err) => {
        console.error('Error adding document: ', err);
    })
}

const addPrivateChannelToFirebase = async(channelName, channelUrl, email, username, channelPassword) => {
    db.collection(PRV_DB).doc(channelName)
    .set({
        channelUrl: channelUrl, 
        channelPassword: channelPassword,
        channelUsers: [email]
    })
    .then((docRef) => {
        // #toDisable
        console.log(success('Private channel successfully created'));
        setTimeout(() => {
            // Either way the above function @addOpenChannelToFirebase and this one
            // will call the @postCreateChannelPrompt with the correct URLs

            postCreateChannelPrompt(channelName, email, channelUrl, username, privateChannel);
        }, 1000)
    }, 0)
}

// Function 1
let createChannelPrompt = (email, username) => {
    const question = [
        {
            name: 'nameOfChannel',
            message: 'Please type out the name of the channel:',
            type: 'input'
        }
    ]
    inquirer.prompt(question).then((answer) => {
        let {nameOfChannel} = answer;
        chooseOpenOrPrivate(nameOfChannel, email, username);
    })
}


// Function 2
let chooseOpenOrPrivate = (nameOfChannel, email, username) => {
    const question = [
        {
            name: 'channelType',
            message: 'What kind of channel do you want to create? A private channel will require you to create a password',
            type: 'list',
            choices: [
                'Open',
                'Private',
            ]
        }
    ]
    inquirer.prompt(question).then((answer) => {
        const { channelType } = answer;
        if (channelType === 'Private') {
            typeInPrivateChannelPasswordPrompt(nameOfChannel, email, username);
        } else if (channelType === 'Open') {
            // Calls the prompt that allows us to create an open channel (below this function)
            createChannelWithSendbird(nameOfChannel, email, username, openChannel);
        }
    })
}

// Function 3A
let typeInPrivateChannelPasswordPrompt = (nameOfChannel, email, username) => {
    const questions = [
        {
            name: 'privateChannelPassword',
            message: "Type in the private channel's password",
            input: 'password'
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        let { privateChannelPassword } = answer;
        createChannelWithSendbird(nameOfChannel, email, username, privateChannel, privateChannelPassword)
    })
}


// @createOpenChannel
// Function creates the channel within the first sendbird account ('SendbirdOpen') dedicated
// to open channels
// --> Used within @createChannelWithSendbird general function
let createOpenChannel = (nameOfChannel, email, username) => {
    openSB.connect(email, (connectedUser, err) => {
        openSB.OpenChannel.createChannel(nameOfChannel, '', '', [], '', function (openChannel, err) {
            if (err) {
                console.log(error('Could not create public channel successfully'));
                // #toDo:  Go back to menu instead of returning
                return
            }

            let { url } = openChannel;

            // Call Firebase Function that adds the channel name and url to the Firebase database
            // Open channels don't have password so no password argument in this function call
            // (as opposed to below)
            addOpenChannelToFirebase(nameOfChannel, url, email, username)
        });
    })
}


// @createPrivateChannel
// Function that creates the channel within the second sendbird account ('SendbirdPrivate') dedicated to
// private channels
// --> Used like the function above within the @createchannelWithSendbird general function
let createPrivateChannel = (nameOfChannel, email, username, password) => {
    privateSB.connect(email, (connectedUser, err) => {
        privateSB.OpenChannel.createChannel(nameOfChannel, '', '', [], '', function (openChannel, err) {
            if (err) {
                console.log(error('Could not create private channel successfully'));
                // #toDo:  Go back to menu instead of returning
                return
            }

            let { url } = openChannel;

            // Adds private channel to private_channel_list database in firestore, for authentication later
            // and also in order to retrieve channel URL when user tries to log in
            addPrivateChannelToFirebase(nameOfChannel, url, email, username, password);
        });
    })
}

// Function 3B or 4
let createChannelWithSendbird = async (nameOfChannel, email, username, channelType, password)  => {
    if (channelType === 'open') {
        createOpenChannel(nameOfChannel, email, username)
    } else if (channelType === 'private') {
        createPrivateChannel(nameOfChannel, email, username, password);
    }
}


module.exports = {
    createChannelPrompt
}

// External Modules
const inquirer = require('inquirer');
// Internal Modules
const { postCreateChannelPrompt } = require('./postCreateChannelPrompt');
