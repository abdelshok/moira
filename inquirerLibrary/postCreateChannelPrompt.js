// postCreateChannelPrompt used to display a message that allows the user
// to go to the newly channel created or to retrieve all of the public channel

'use strict';

// External Packages
const clear = require('clear');
// Internal Modules
const { SB } = require('../configurations/sendbird');
const { success, neutral, error } = require('../chalkLibrary');
const { getChannelListPrompt } = require('./getChannelListPrompt');
const { messageOrConnectPrompt } = require('./messageOrConnectPrompt');

let postCreateChannelPrompt = (newChannelName, email, channelUrl, username) => {
    clear();

    // Constants that will be called as options within the inquirer prompt below
    const goToChannel = `Go to ${newChannelName} channel`;
    const retrieveChannels = 'Retrieve list of available channels';

    const question = [
        {
            name: 'userChoice',
            message: `${newChannelName} channel successfully created`,
            type: 'list',
            choices: [
                goToChannel,
                retrieveChannels,
            ]
        }
    ]
    inquirer.prompt(question).then((answer) => {
        const { userChoice } = answer;
        if (userChoice === goToChannel) {
            console.log(success('Connecting you to the correct channel'));
            messageOrConnectPrompt(email, newChannelName, channelUrl)
        } else if (userChoice === retrieveChannels) {
            console.log('Retrieving list of channels')
            getChannelListPrompt(email);
        }
    })
}

module.exports = {
    postCreateChannelPrompt
}

// External Modules
const inquirer = require('inquirer');
