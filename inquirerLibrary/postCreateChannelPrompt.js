// postCreateChannelPrompt used to display a message that allows the user
// to go to the newly channel created or to retrieve all of the open channel

'use strict';

// External Packages
const clear = require('clear');
// Internal Modules
// APIs
const { SB } = require('../configurations/sendbirdOpen');
// Coloring for CLI
const { success, neutral, error } = require('../chalkLibrary');
// Inquirer Prompts
const { getChannelListPrompt } = require('./getChannelListPrompt');
const { messageOrConnectPrompt } = require('./messageOrConnectPrompt');

let postCreateChannelPrompt = (newChannelName, email, channelUrl, username, channelType) => {
    clear();

    // Constants that will be called as options within the inquirer prompt below
    const goToChannel = `Go to ${newChannelName} channel`;
    const goBackToMenu = 'Go back to Main Menu';

    const question = [
        {
            name: 'userChoice',
            message: `${newChannelName} channel successfully created`,
            type: 'list',
            choices: [
                goToChannel,
                goBackToMenu,
            ]
        }
    ]
    inquirer.prompt(question).then((answer) => {
        const { userChoice } = answer;
        if (userChoice === goToChannel) {
            console.log(success('Connecting you to the correct channel'));
            // @messageOrConnectPrompt has 5 parameters
            messageOrConnectPrompt(email, newChannelName, channelUrl, username, channelType)
        } else if (userChoice === goBackToMenu) {
            clear();
            // @createOrRetrievePrompt: 2 parameters
            createOrRetrievePrompt(email, username);
        }
    })
}

module.exports = {
    postCreateChannelPrompt
}

// External Modules
const inquirer = require('inquirer');
const { createOrRetrievePrompt } = require('./createOrRetrievePrompt');

