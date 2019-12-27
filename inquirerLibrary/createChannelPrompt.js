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
// Firebase Database
const db = firebase.firestore();

// Firebase Functions
// Kept here because it atually calls the correct inquirer prompt when data
// is successfully added 
const addNewChannelToFirebase = async (channelName, channelUrl, email, username) => {
    db.collection('existing_channels').add({
        channel_url: channelUrl,
        channel_name: channelName,
    }).then((docRef) => {
        // #toDisable
        console.log(success('Channel URL stored successfully in Firestore'));
        postCreateChannelPrompt(channelName, email, channelUrl, username);
    }).catch((err) => {
        console.error('Error adding document: ', err);
    })
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
        console.log(`Channel name chosen is ${nameOfChannel}`);
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
            // Call the external prompt that will ask the user to create a password and will store the
            // authentication information within Firebase
            console.log(error("Feature not available yet. It'll be out soon. Redirecting you to the previosu choices, simply choose Public next. 😊"));
            setTimeout(() => { // Chaining asynchronous callbacks here to make sure they happen one after the other
                clear();
                setTimeout(()=> { // Anonymous functions allows us to add parameters to our callback
                    choosePublicOrPrivatePrompt(nameOfChannel, email)
                }, 1000)
            }, 5000);
        } else if (channelType === 'Public') {
            // Calls the prompt that allows us to create an open channel (below this function)
            createChannelWithSendbird(nameOfChannel, email, username);
        }
    })
}

let createChannelWithSendbird = async (nameOfChannel, email, username)  => {
    SB.connect(email, (connectedUser, err) => {
        SB.OpenChannel.createChannel(nameOfChannel, '', '', [], '', function (openChannel, err) {
            if (err) {
                console.log(error('Could not create channel successfully'));
                // #toDo:  Go back to menu instead of returning
                return
            }

            let { url } = openChannel;

            // #toChange --> Firebase Db permissions
            // Call Firebase Function that adds the channel name and url to the Firebase database
            addNewChannelToFirebase(nameOfChannel, url, email, username)
        });
    })
}


module.exports = {
    createChannelPrompt
}

// External Modules
const inquirer = require('inquirer');
// Internal Modules
