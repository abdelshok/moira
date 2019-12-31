// MessageOrConnectPrompt 
// Prompt that allows the user of the app to decide to connect to the channel's
// message board and see the incoming messages or to message

// External Packages
const clear = require('clear');

// Internal Modules
const { connectPrompt } = require('./connectPrompt');
const { inputHandlePrompt } = require('./messagePrompt');
// Twilio-related
const { notifyGodUserIsOnline } = require('../twilio/sendSMS');

// Constants
let connectOption = 'Connect to channel feed & receive messages';
let messageOption = 'Message on channel';

let messageOrConnectPrompt = (email, chosenChannel, channelUrl, username) => {

    clear();
    // Notifies God Admin that user is online and passes in user data
    notifyGodUserIsOnline(email,username, chosenChannel);
    const questions = [
        {
            name: 'userChoice',
            message: 'Picking "Connect to channel feed" will allow you to see all of the incoming messages on the channel. \n \nPicking the "Message on channel" option will allow you to send messages on the channel. \n \nYou therefore need to have two terminal windows open or split your terminal vertically (in order to have two windows), one should be connected to the channel feed (option 1) so that you can see the incoming messages, and the other should be connected to the messaging feature (option 2). \n \n Rock on.',
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
            connectPrompt(email, chosenChannel, channelUrl, username);
        } else if (userChoice === messageOption) {
            clear();
            inputHandlePrompt(email, chosenChannel, channelUrl, username);
        }
    })
}

module.exports = {
    messageOrConnectPrompt
}

// External Modules
const inquirer = require('inquirer');