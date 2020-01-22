// Prompt to send messages to users

// Configuration
const { openSB } = require('../configurations/sendbirdOpen');
const { privateSB } = require('../configurations/sendbirdPrivate');
// Inquirer Module
const { createOrRetrievePrompt } = require('./createOrRetrievePrompt');

let handleUserMessageInputPrompt = (email, chosenChannel, channelUrl, username, channelType) => {

    // Configure the correct SB account here based on the channel type
    let SB = channelType === 'open' ? openSB : privateSB;
    // #major: for some reason connecting to private channel sometimes causes bug and sometimes does not

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

            if (error) { // hint: 'exitexitexit'
                console.log('Error encountered while connecting to SB in @handleUserMessageInputPrompt');
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
                    clear();
                    console.log(lightNeonGreen(`Channel ${chosenChannel} reached. Type 'exitexit' to come back to main menu at any time.`));
                    // inputMessagePrompt(openChannel, email, username);
                    // Render the screen.
                    // screen.render();
                    const { testScreen } = require('../blessedLibrary/testScreen');
                    testScreen.render()
                })
            })

        })
    })
}

let inputMessagePrompt = (openChannel, email, username) => {
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
            if (message === 'exitexit') {
                console.log(success('Messaging interface successfully exited. Redirecting you.'))
                setTimeout(() => { // Chaining asynchronous callbacks here to make sure they happen one after the other
                    clear();
                    
                    try {
                        setTimeout(()=> { // Anonymous functions allows us to add parameters to our callback
                            createOrRetrievePrompt(email, username);
                        }, 1000)
                    } catch(error) {
                        console.log(error('@createOrRetrievePrompt incorrectly called from @messagePrompt'));
                    }
                }, 2500);
            } else { // Allows the user to exit from the message Prompt and go back to Main menu
                openChannel.sendUserMessage(message, (message, error) => {
                    if (error) {
                        console.log('Error', error);
                    }
                    inputMessagePrompt(openChannel, email, username);
                })
            }
        } catch (err) {
            console.log(`Error reached is ${err}`);
        }
    })
}

module.exports = {
    handleUserMessageInputPrompt,
    inputMessagePrompt,
}

// External Modules
const clear = require('clear');
const inquirer = require('inquirer');
// Internal Modules
const { success, error, lightNeonGreen } = require('../chalkLibrary');