// Prompt to send messages to users

const { SB } = require('../modules/sendbird');

let inputHandlePrompt = (email) => {
    const questions = [
        {
            name: 'nickname',
            type: 'input',
            message: 'Type in your handle'
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        let { nickname } = answer;

        // Create an object with both the email and the handle itself? 
        // ToChange: Nickname used here to set up unique Sendbird ID. A better choice would be email.
        // I'll use email for now which prevents people faking their identity. Will figure out
        // how to implement nickname later

        // Temporary new implementation connects the user to the sendbird API with the user name
        SB.connect(nickname, (user, error) => {
            if (error) {
                console.log('Error encountered while connecting to SB');
                return;
            };
            // newFeature: Figure out how to add metaData like nickname, etc. later
            SB.OpenChannel.getChannel('channel_one') // ToChange: The channel here is hard-coded. That's not good. 
            .then((openChannel, error) => {
                openChannel.enter((response, error) => {
                    if (error) {
                        console.log('Open channel not reached');
                        return;
                    }
                    // Accepts an input message and makes sure to send it through the socket
                    // which is possible because we pass through the 'openChannel' object
                    console.log('Open channel reached');
                    clear();
                    inputMessagePrompt(openChannel);
                })
            })

        })
    })
}

let inputMessagePrompt = (openChannel) => {
    const questions = [
        {
            name: 'message',
            type: 'input',
            message: 'Type your message and press enter:'
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        try {
            let { message } = answer;
            if (message === 'exitexitexit') {
                console.log(success('Messaging interface successfully exited.'))
                messageOrConnectPrompt();
            } else { // Allows the user to exit from the message Prompt and go back to Main menu
                openChannel.sendUserMessage(message, (message, error) => {
                    if (error) {
                        console.log('Error', error);
                    }
                    inputMessagePrompt(openChannel);
                })
            }
        } catch (err) {
            console.log(`Error reached is ${err}`);
        }
    })
}

module.exports = {
    inputHandlePrompt,
    inputMessagePrompt,
}

// External Modules
const clear = require('clear');
const inquirer = require('inquirer');
// Internal Modules
const { messageOrConnectPrompt } = require('./messageOrConnectPrompt');
const { success, error } = require('../chalkLibrary');