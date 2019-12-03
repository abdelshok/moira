// Prompt that imports both the connectPrompt, which connects the user to the chat feed, and the message
// Prompt, which enables users to send messages to the feed. 

let connectOption = 'Connect to Channel Feed';
let messageOption = 'Message';
let retrieveChannelsOption = 'Retrieve Available Channels'

// Internal Modules
const { connectPrompt } = require('./connectPrompt');
const { inputHandlePrompt } = require('./messagePrompt');
const { getChannelListPrompt } = require('./getChannelListPrompt');

let messageOrConnectPrompt = (email) => {
    const questions = [
        {
            name: 'userChoice',
            message: 'Pick your poison 💀',
            type: 'list',
            choices: [
                `${connectOption}`,
                `${messageOption}`,
                `${retrieveChannelsOption}`,
            ]
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        let {userChoice} = answer;
        if (userChoice === connectOption) {
            connectPrompt(email);
        } else if (userChoice === messageOption) {
            inputHandlePrompt(email);
        } else if (userChoice === retrieveChannelsOption) {
            getChannelListPrompt();
        }
    })
}

module.exports = {
    messageOrConnectPrompt,
}


// External Modules
const inquirer = require('inquirer');
