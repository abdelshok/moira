// Prompt that imports both the connectPrompt, which connects the user to the chat feed, and the message
// Prompt, which enables users to send messages to the feed. 

let connectOption = 'Connect to Channel Feed';
let messageOption = 'Message';

// Internal Modules
const { connectPrompt } = require('./connectPrompt');
const { inputHandlePrompt } = require('./messagePrompt');

let messageOrConnectPrompt = (email) => {
    const questions = [
        {
            name: 'userChoice',
            message: 'Pick your poison 💀',
            type: 'list',
            choices: [
                `${connectOption}`,
                `${messageOption}`
            ]
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        let {userChoice} = answer;
        if (userChoice === connectOption) {
            connectPrompt(email);
        } else if (userChoice === messageOption) {
            inputHandlePrompt(email);
        }
    })
}

module.exports = {
    messageOrConnectPrompt,
}


// External Modules
const inquirer = require('inquirer');
