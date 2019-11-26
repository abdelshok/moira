// Prompt to send messages to users

// const SendBird = require('sendbird');
// const sb = new SendBird({appId: '0eb29a7977a1616f453d45d553d920a451e40725'});
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

        console.log('User data', userData);
        SB.connect(email, (user, error) => {
            if (error) {
                console.log('Error encountered while connecting to SB');
                return;
            };
            // newFeature: Figure out how to add metaData like nickname, etc. later
            SB.OpenChannel.getChannel('general_chat')
            .then((openChannel, error) => {
                console.log('Open channel reached');
                openChannel.enter((response, error) => {
                    if (error) {
                        return;
                    }
                    // openChannel.sendUserMessage(message, (message, error) => {
                    //     if (error) {
                    //         console.log('Error', error);
                    //     }
                    inputMessagePrompt(openChannel);
                    // })
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
    inputHandlePrompt,
    inputMessagePrompt,
}

// External Modules
const inquirer = require('inquirer');
// Internal Modules
