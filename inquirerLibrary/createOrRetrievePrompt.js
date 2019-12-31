// Prompt that imports both the connectPrompt, which connects the user to the chat feed, and the message
// Prompt, which enables users to send messages to the feed. 


// #TODO: Change the name of this file, it doesn't describe it correctly

let retrieveChannelsOption = 'Retrieve list of available open channels';
let searchPrivateChannelOption = 'Search and join private channel';
let createChannelOption = 'Create public or private channel';

// Internal Modules
const { getChannelListPrompt } = require('./getChannelListPrompt');
const { createChannelPrompt } = require('./createChannelPrompt');
const { typeInPrivateChannelNamePrompt } = require('./searchPrivateChannelPrompt');

let createOrRetrievePrompt = (email, username) => {
    const questions = [
        {
            name: 'userChoice',
            message: 'Make your pick 🌈',
            type: 'list',
            choices: [
                `${retrieveChannelsOption}`,
                `${searchPrivateChannelOption}`,
                `${createChannelOption}`,
            ]
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        let {userChoice} = answer;
        if (userChoice === retrieveChannelsOption) {
            getChannelListPrompt(email, username);
        } else if (userChoice === searchPrivateChannelOption) {
            // Prompt in order to search private channel
            typeInPrivateChannelNamePrompt(email, username);
        }
        else if (userChoice === createChannelOption) {
            // Put the prompt that will be shown now to create the name of the channel
            createChannelPrompt(email, username);
        }
    })
}

module.exports = {
    createOrRetrievePrompt,
}


// External Modules
const inquirer = require('inquirer');
