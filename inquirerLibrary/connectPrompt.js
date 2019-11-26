// Prompt to send or receive message
const SendBird = require('sendbird');
const sb = new SendBird({ appId: process.env.SENDBIRD_APP_ID});

const { major, error, success, important, neutral, light} = require('../chalkLibrary');
let arrayColorMessage = [major, error, success, neutral, important, light];
let counter = 0;

let connectPrompt = () => {
    const questions = [{
        name: 'emailInput',
        message: 'Enter your email',
        type: 'input',
    }]
    inquirer.prompt(questions).then((answer) => {
        const { emailInput } = answer;
        sb.connect(emailInput, (user, error) => {
            console.log(`User successfully logged in with username ${emailInput}`);
            sb.OpenChannel.getChannel('general_chat')
            .then((openChannel, error) => {
                openChannel.enter((response, error) => {
                    if (error) {
                        return;
                    }

                    var ChannelHandler = new sb.ChannelHandler();
                    ChannelHandler.onMessageReceived = (url, messageObject) => {
                        let { message } = messageObject;
                        let { userId } = messageObject._sender;
                        let finalMessage = userId + ': ' + message;
                        let lengthArray = arrayColorMessage.length;
                        let currentColor = arrayColorMessage[counter];
                        counter++;
                        counter == lengthArray ? counter = 0 : counter;
                        console.log(currentColor(finalMessage));
                    }; // Needs to be unique id
                    sb.addChannelHandler('abcdefgh', ChannelHandler);

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
//const { firebase } = require('../index.js')
const { inputMessagePrompt } = require('./messagePrompt');
