// Prompt to send messages to users

const { SB } = require('../configurations/sendbird');

let inputHandlePrompt = (email, chosenChannel, channelUrl, username) => {
    const questions = [
        {
            name: 'connectToChatConfirmation',
            type: 'confirm',
            message: 'Please confirm you want to send messages on the chat.'
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        // Create an object with both the email and the handle itself? 
        // I'll use email for now which prevents people faking their identity. Will figure out
        // how to implement nickname later

        // Temporary new implementation connects the user to the sendbird API with the user name
        SB.connect(username, (user, error) => {
            if (error) {
                console.log('Error encountered while connecting to SB');
                return;
            };
            SB.OpenChannel.getChannel(channelUrl) // Connects you to the correct channel to chat
            .then((openChannel, error) => {
                openChannel.enter((response, error) => {
                    if (error) {
                        console.log('Open channel not reached');
                        return;
                    }
                    // Accepts an input message and makes sure to send it through the socket
                    // which is possible because we pass through the 'openChannel' object
                    console.log(`Open channel ${chosenChannel} reached`);
                    clear();
                    inputMessagePrompt(openChannel, email);
                })
            })

        })
    })
}

let inputMessagePrompt = (openChannel, email) => {
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
                console.log(success('Messaging interface successfully exited. Redirecting you.'))
                setTimeout(() => { // Chaining asynchronous callbacks here to make sure they happen one after the other
                    clear();
                    setTimeout(()=> { // Anonymous functions allows us to add parameters to our callback
                        createOrRetrievePrompt(email);
                    }, 1000)
                }, 2500);
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
const { createOrRetrievePrompt } = require('./createOrRetrievePrompt');
const { success, error } = require('../chalkLibrary');