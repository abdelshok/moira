// Prompt that allows the current user to create a new channel that they
// can use to speak with, with their friends, it will also link to another prompt 
// which will allow the user to create a password for the channel and set it before
// before inviting other users

'use strict';

// External Packages
// Internal Modules
const { SB } = require('../configurations/sendbird');
const { success, neutral, error } = require('../chalkLibrary'); // We import the success type of log in order to use it to notify the user the channel is created successfully
const { postCreateChannelPrompt } = require('./postCreateChannelPrompt');
const clear = require('clear');
const { firebase } = require('../configurations/firebaseConfig');

//require("firebase/firestore");

// Constants

// These two variables are passed down to the @createChanneLWithSendbird function
// at the end of the file in order to let it know whether the channel create is going
// to be public or private
const publicChannel = 'public'
const privateChannel = 'private'

// Firebase Database
const db = firebase.firestore();

// Firebase Functions
const addOpenChannelToFirebase = async (channelName, channelUrl, email, username) => {
    db.collection('open_channels_list').doc(channelName)
    .set({
        channelUrl: channelUrl,
    }).then((docRef) => {
        // #toDisable
        // console.log(success('Channel successfully created'));
        setTimeout(() => {
            clear();
            setTimeout(() => {
                postCreateChannelPrompt(channelName, email, channelUrl, username);
            }, 1000)
        }, 0)
    }).catch((err) => {
        console.error('Error adding document: ', err);
    })
}

const addPrivateChannelToFirebase = async(channelName, channelUrl, email, username, channelPassword) => {
    db.collection('private_channels_list').doc(channelName)
    .set({
        channelUrl: channelUrl, 
        channelPassword: channelPassword
    })
    .then((docRef) => {
        // #toDisable
        console.log(success('Private channel successfully created'));
        setTimeout(() => {
            postCreateChannelPrompt(channelName, email, channelUrl, username);
        }, 1000)
    }, 0)
}

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
        choosePublicOrPrivatePrompt(nameOfChannel, email, username);
    })
}

let choosePublicOrPrivatePrompt = (nameOfChannel, email, username) => {
    const question = [
        {
            name: 'channelType',
            message: 'What kind of channel do you want to create? A private channel will require you to create a password',
            type: 'list',
            choices: [
                'Public',
                'Private',
            ]
        }
    ]
    inquirer.prompt(question).then((answer) => {
        const { channelType } = answer;
        if (channelType === 'Private') {
            typeInPrivateChannelPasswordPrompt(nameOfChannel, email, username);
        } else if (channelType === 'Public') {
            // Calls the prompt that allows us to create an open channel (below this function)
            createChannelWithSendbird(nameOfChannel, email, username, publicChannel);
        }
    })
}

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

let createChannelWithSendbird = async (nameOfChannel, email, username, typeOfChannel, password)  => {
    SB.connect(email, (connectedUser, err) => {
        SB.OpenChannel.createChannel(nameOfChannel, '', '', [], '', function (openChannel, err) {
            if (err) {
                console.log(error('Could not create channel successfully'));
                // #toDo:  Go back to menu instead of returning
                return
            }

            let { url } = openChannel;

            if (typeOfChannel === 'open') {
                // Call Firebase Function that adds the channel name and url to the Firebase database
                // Open channels don't have password so no password argument in this function call
                // (as opposed to below)
                addOpenChannelToFirebase(nameOfChannel, url, email, username)
            } else if (typeOfChannel === 'private') {
                // Calls function that will add new private channel with related information: password, url
                // to the firebase database
                addPrivateChannelToFirebase(nameOfChannel, url, email, username, password);
            }

        });
    })
}


module.exports = {
    createChannelPrompt
}

// External Modules
const inquirer = require('inquirer');
// Internal Modules
