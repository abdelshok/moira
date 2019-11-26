// Prompt to send or receive message

// Modules 
const { SB } = require('../modules/sendbird');
// Utility Functions
const { major, error, success, important, neutral, light} = require('../chalkLibrary');
let arrayOfMessageColors = [major, error, success, neutral, important, light];
let counter = 0;


let connectPrompt = (email) => {
    const questions = [{
        name: 'nickname',
        message: 'Enter your handle',
        type: 'input',
    }]
    inquirer.prompt(questions).then((answer) => {
        const { nickname } = answer;
        SB.connect(email, (user, error) => {
            console.log(`User successfully logged in with username ${email}`);
            SB.OpenChannel.getChannel('general_chat')
            .then((openChannel, error) => {
                openChannel.enter((response, error) => {
                    if (error) {
                        console.log('Channel unsuccessfully entered.')
                        return;
                    }

                    var ChannelHandler = new SB.ChannelHandler();
                    ChannelHandler.onMessageReceived = (url, messageObject) => {
                        let { message } = messageObject;
                        let { userId } = messageObject._sender;
                        let finalMessage = userId + ': ' + message;
                        let lengthArray = arrayOfMessageColors.length;
                        let currentColor = arrayOfMessageColors[counter];
                        counter++;
                        counter == lengthArray ? counter = 0 : counter;
                        console.log(currentColor(finalMessage));
                    }; // Channel handler needs to have unique id
                    SB.addChannelHandler('abcdefgh', ChannelHandler); // NewFeature: Use a cryptographic module here to prevent collisions
                    // or create your own it's actually kind of fun.
                });
            })
        })
    })
}

module.exports = {
    connectPrompt
}

// External Modules
const inquirer = require('inquirer');
// Internal Modules
const { inputMessagePrompt } = require('./messagePrompt');
