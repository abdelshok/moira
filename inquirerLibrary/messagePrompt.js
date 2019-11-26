// Prompt to send messages to users

const SendBird = require('sendbird');
// const { sb } = require('../index');
var sb = new SendBird({appId: process.env.SENDBIRD_API_ID});
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// const sb = new SendBird({ appId: process.env.SENDBIRD_APP_ID});

let inputEmailPrompt = (sendbirdObject) => {
    const questions = [
        {
            name: 'email',
            type: 'input',
            message: 'Type your email'
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        let { email } = answer;
        sb.connect(email, (user, error) => {
            console.log('Hi')
            console.log(`User successfully logged in with username ${email}`);
            // sb.OpenChannel.getChannel('general_chat')
            // .then((openChannel, error) => {
            //     console.log('Open channel reached');
            //     openChannel.enter((response, error) => {
            //         if (error) {
            //             return;
            //         }
            //         // openChannel.sendUserMessage(message, (message, error) => {
            //         //     if (error) {
            //         //         console.log('Error', error);
            //         //     }
            //         inputMessagePrompt(openChannel);
            //         // })
            //     })
            // })
            sb.OpenChannel.getChannel('general_chat', (openChannel, error) => {
                if (error) {
                    console.log('Error reached when trying to get channel');
                    console.log(error);
                    return error;
                }
                console.log('Got channel');
                openChannel.enter((response, error) => {
                    if (error) {
                        console.log('Error reached when entering channel');
                        return;
                    }
                    console.log('Channel entered');
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
        let { message } = answer;
        openChannel.sendUserMessage(message, (message, error) => {
            if (error) {
                console.log('Error', error);
            }
            inputMessagePrompt(openChannel);
        })
    })
}

module.exports = {
    inputEmailPrompt,
    inputMessagePrompt,
}

// External Modules
const inquirer = require('inquirer');
// Internal Modules
//const { firebase } = require('../index.js')
const { error, success, important } = require('../chalkLibrary');
