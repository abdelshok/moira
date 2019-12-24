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
require("firebase/firestore");
const db = firebase.firestore(); // Database

// Firebase Function
// As the name suggests, calls the next inquirer with the correct URL once it returns true 
const findChannelUrlInFirebase = (channelString, email, username) => {
    db.collection('existing_channels') // Querying for specific channeld doesn't work yet: where('channel_name', '==', channelName)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const data =  doc.data();
            let { channel_name, channel_url } = data;
            // console.log('Channel name is ', channel_name);
            let newChannelName = findChannelName(channelString)
            // console.log('Chosen channel name by user', newChannelName);
            if (channel_name === newChannelName) { // Then we found channel url
                // Call inquirer here
                // #toDisable
                // console.log('Connecting to channel with url' , channel_url);
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
    // #toDo: sometimes you connect on sendbird with the nickName (username is better word) and sometimes
    // you do it with the email. Decide. Be consistent motherfucker. 
    inquirer.prompt(questions).then((answer) => {
        const { retrieveChannel } = answer;
        // #toDisable
        console.log(neutral('Connecting to servers'));
        // console.log(`Going to connect to sendbird with username ${email}`);
        // TODELETE (above): nickname constant
        // Note to self and to anyone in the future: it doesn't specify it in the Sendbird
        // API but you end to always initially connect to sendbird before making any operations
        // like querying the list of open channels, etc.
        SB.connect(email, (user, error) => {
            let openChannelListQuery = SB.OpenChannel.createOpenChannelListQuery();

            openChannelListQuery.next(function(openChannels, error) {
                if (error) {
                    return;
                }
                // Array returned which we'll pass to the next inquirer prompt to display
                // the list of the new channels the user can choose from
                const openChannelArray = findChannelCountAndUrl(openChannels);
                clear();
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
            message: 'Choose from list of channels: \n \n',
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
