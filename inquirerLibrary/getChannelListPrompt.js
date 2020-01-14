// Prompt that gives client user a list of the available channels in SendBird 
// Might be changed to another API later down the line, like the AWS one

'use strict';

//// External Packages
const clear = require('clear');
//// Internal Modules
const { firebase } = require('../configurations/firebaseConfig');
const { success, neutral, lightNeonPurple, realRed} = require('../chalkLibrary');
// Sendbird API 
const { openSB } = require('../configurations/sendbirdOpen');
// Utility functions
const { findChannelCountAndUrl, reformatChannelArray } = require('../utilityLibrary/channelUtility');
const { findChannelName } = require('../utilityLibrary/getChannelUtility');
// Inquirer-CLI-related prompts
const { messageOrConnectPrompt } = require('./messageOrConnectPrompt');
// Firebase-related initializations
const db = firebase.firestore(); 
// Constants
const { OPEN_DB } = require('../env.js');
const openChannel = 'open';

// Firebase Function

// @findChannelUrlInFirebase
// Queries the firebase database with the channel name in order to find the channel's URL on sendbird
// Input: 
// - channelName
// - email (string): passed down to the next function
// - username (string): like the above, passed down to the next function in order to connect the user
// to the sendbird API correctly
// Output:
// - None. Simply calls the messageOrConnectPrompt() function with the found URL.
const findChannelUrlInFirebase = (channelString, email, username) => {
    let channelName = findChannelName(channelString);
    console.log('Channel selected is', channelName);
    console.log('About to run the firebase call to find URL');
    db.collection(OPEN_DB).doc(channelName)
    .get() // #toDo: put the database name within the process.env fil.get()
    .then((querySnapshot) => {
        const channelData = querySnapshot.data();
        const { channelUrl } = channelData;
        messageOrConnectPrompt(email, channelName, channelUrl, username, openChannel); 
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
        console.log(realRed('Connecting to servers'));
        
        // Note to self and to anyone in the future: it doesn't specify it in the Sendbird
        // API but you end to always initially connect to sendbird before making any operations
        // like querying the list of open channels, etc.

        // The first connection to Sendbird is with the user email (the username could also be used)
        // All the following connections are done with the user name. 
        // #foodForThought: might be better to be consistent and only use the email? 
        // Would increase privacy. 
        openSB.connect(email, (user, error) => {
            let openChannelListQuery = openSB.OpenChannel.createOpenChannelListQuery();
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
