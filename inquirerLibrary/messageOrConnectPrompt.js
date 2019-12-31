// MessageOrConnectPrompt 
// Prompt that allows the user of the app to decide to connect to the channel's
// message board and see the incoming messages or to message

// External Packages
const clear = require('clear');

// Internal Modules
const { connectPrompt } = require('./connectPrompt');
const { handleUserMessageInputPrompt } = require('./messagePrompt');
// Twilio-related
// const { notifyGodUserIsOnline } = require('../twilio/sendSMS');

// Constants
let connectOption = 'Connect to channel feed & receive messages';
let messageOption = 'Message on channel';

let messageOrConnectPrompt = (email, chosenChannelName, channelUrl, username, channelType) => {

    clear();
    // Notifies God Admin that user is online and passes in user data
    // notifyGodUserIsOnline(email, username, chosenChannelName);
    const questions = [
        {
            name: 'userChoice',
            message: '\nPicking the first option will allow you to see incoming messages on the channel.\n\nPicking the second option will allow you to send messages to the channel.\n\nYou need to be connected to both streams to communicate with your friends (meaning two terminal windows or one window split in half).',
            type: 'list',
            choices: [
                `${connectOption}`,
                `${messageOption}`,

            ]
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        let { userChoice } = answer;
        if (userChoice === connectOption) {
            clear();
            connectPrompt(email, chosenChannelName, channelUrl, username, channelType);
        } else if (userChoice === messageOption) {
            clear();
            handleUserMessageInputPrompt(email, chosenChannelName, channelUrl, username, channelType);
        }
    })
}

module.exports = {
    messageOrConnectPrompt
}

// External Modules
const inquirer = require('inquirer');