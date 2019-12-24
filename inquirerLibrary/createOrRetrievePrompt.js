// Prompt that imports both the connectPrompt, which connects the user to the chat feed, and the message
// Prompt, which enables users to send messages to the feed. 

let retrieveChannelsOption = 'Retrieve available channels';
let createChannelOption = 'Create open channel';

// Internal Modules
const { getChannelListPrompt } = require('./getChannelListPrompt');
const { createChannelPrompt } = require('./createChannelPrompt');

let createOrRetrievePrompt = (email, username) => {
    const questions = [
        {
            name: 'userChoice',
            message: 'Pick your poison 💀',
            type: 'list',
            choices: [
                `${retrieveChannelsOption}`,
                `${createChannelOption}`
            ]
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        let {userChoice} = answer;
        if (userChoice === retrieveChannelsOption) {
            getChannelListPrompt(email, username);
        } else if (userChoice === createChannelOption) {
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
