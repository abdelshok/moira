// MessageOrConnectPrompt 
// Prompt that allows the user of the app to decide to connect to the channel's
// message board and see the incoming messages or to message

// External Packages
const clear = require('clear');

// Internal Modules
const { connectPrompt } = require('./connectPrompt');
const { inputHandlePrompt } = require('./messagePrompt');

// Constants
let connectOption = 'Connect to channel feed & receive messages';
let messageOption = 'Message on channel';

let messageOrConnectPrompt = (email, chosenChannel, channelUrl, username) => {
    const questions = [
        {
            name: 'userChoice',
            message: '\n Make your pick. \n \n Picking the first option will allow you to see the incoming messages. \n \n Picking the second option will allow you to message on the channel. \n \n This therefore means that you need to have two windows open on this channel: one to send messages and one to receive incoming messages. \n',
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