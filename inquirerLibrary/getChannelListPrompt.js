// Prompt that gives client user a list of the available channels in SendBird 
// Might be changed to another API later down the line, like the AWS one

'use strict';

// Internal Modules
// Sendbird API 
const { SB } = require('../modules/sendbird');
const { findChannelCountAndUrl, reformatChannelArray } = require('../utilityLibrary/channelUtility');


let getChannelListPrompt =  () => {
    const questions = [
        {
            name: 'retrieveChannel',
            message: 'Retrieve list of channels?',
            type: 'confirm'
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        const { retrieveChannel } = answer;
        const nickName = 'abdel';
        // TODELETE (above): nickname constant
        // Note to self and to anyone in the future: it doesn't specify it in the Sendbird
        // API but you end to always initially connect to sendbird before making any operations
        // like querying the list of open channels, etc.
        SB.connect(nickName, (user, error) => {
            let openChannelListQuery = SB.OpenChannel.createOpenChannelListQuery();

            openChannelListQuery.next(function(openChannels, error) {
                if (error) {
                    return;
                }
                // Array returned which we'll pass to the next inquirer prompt to display
                // the list of the new channels the user can choose from
                const openChannelArray = findChannelCountAndUrl(openChannels);
                showChannelListPrompt(openChannelArray);
            });
        })

    })
}

let showChannelListPrompt = (channelArray) => {
    let newChannelArray = reformatChannelArray(channelArray);
    const questions = [
        {
            name: 'listOpenChannels',
            type: 'list',
            message: 'Choose from list of channels',
            choices: newChannelArray,
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        console.log('User chose channel');
    })
}


module.exports = {
    getChannelListPrompt
}

const inquirer = require('inquirer');