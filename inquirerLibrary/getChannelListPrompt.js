// Prompt that gives client user a list of the available channels in SendBird 
// Might be changed to another API later down the line, like the AWS one

'use strict';

//// External Packages
const clear = require('clear');
//// Internal Modules
const { firebase } = require('../configurations/firebaseConfig');
const { success, neutral } = require('../chalkLibrary');
// Sendbird API 
const { SB } = require('../configurations/sendbird');
// Utility functions
const { findChannelCountAndUrl, reformatChannelArray } = require('../utilityLibrary/channelUtility');
const { findChannelName } = require('../utilityLibrary/getChannelUtility');
// Inquirer-CLI-related prompts
const { messageOrConnectPrompt } = require('./messageOrConnectPrompt');

// Firebase-related initializations
//require("firebase/firestore");
const db = firebase.firestore(); // Database

// Firebase Function

// @findChannelUrlInFirebase
// Queries the firebase database with the channel name in order to find the channel's URL on sendbird
// Input: 
// - channelString
// - email (string): passed down to the next function
// - username (string): like the above, passed down to the next function in order to connect the user
// to the sendbird API correctly
// Output:
// - None. Simply calls the messageOrConnectPrompt() function with the found URL.
const findChannelUrlInFirebase = (channelString, email, username) => {
    db.collection('existing_channels')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(function(doc) {
            // Allows us to access the data
            const data =  doc.data();
            let { channel_name, channel_url } = data;
            // Takes the channel description (ie. ⛩ asap_mob  🐵 0 participants) and returns the 
            // channel name (ie. "asap_mob")
            let newChannelName = findChannelName(channelString)
            // When the channel name matches the one we're looking for, then we pass the url to the 
            // messageOrConnectPrompt
            if (channel_name === newChannelName) { 
                clear();
                messageOrConnectPrompt(email, newChannelName, channel_url, username); // needs to be passed actual name and url
            }
        });
    })
    .catch((err) => {
        console.log('Error found within findChannelUrlInFirebase fucntion', err);
    })
}
    
let getChannelListPrompt =  (email, username) => {
    const questions = [
        {
            name: 'retrieveChannel',
            message: 'Retrieve list of channels?',
            type: 'confirm'
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        const { retrieveChannel } = answer;
        // #toDisable
        console.log(neutral('Connecting to servers'));
        
        // Note to self and to anyone in the future: it doesn't specify it in the Sendbird
        // API but you end to always initially connect to sendbird before making any operations
        // like querying the list of open channels, etc.

        // The first connection to Sendbird is with the user email (the username could also be used)
        // All the following connections are done with the user name. 
        // #foodForThought: might be better to be consistent and only use the email? 
        // Would increase privacy. 
        SB.connect(email, (user, error) => {
            let openChannelListQuery = SB.OpenChannel.createOpenChannelListQuery();
            openChannelListQuery.next(function(openChannels, error) {
                if (error) {
                    return;
                }
                // Array returned which we'll pass to the next inquirer prompt to display
                // the list of the new channels the user can choose from
                const openChannelArray = findChannelCountAndUrl(openChannels);
                clear(); // Clears the CLI for more visual clarity
                showChannelListPrompt(openChannelArray, email, username);
            });
        })

    })
}

let showChannelListPrompt = async (channelArray, email, username) => {
    let newChannelArray = reformatChannelArray(channelArray);
    const questions = [
        {
            name: 'chosenChannelName',
            type: 'list',
            message: 'Use the arrow keys to navigate through the list of channels: \n \n',
            choices: newChannelArray,
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        const { chosenChannelName } = answer;
        // Firebase function called here in order to find the correct URL
        // of the chosen channel
        findChannelUrlInFirebase(chosenChannelName, email, username);
    })
}

module.exports = {
    getChannelListPrompt
}

const inquirer = require('inquirer');
