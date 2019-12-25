// Prompt to receive message
// #toDo: Change the name to receive messages, this is too unrelated

// External Packages
const clear = require('clear');
// Modules 
const { SB } = require('../configurations/sendbird');
// Utility Functions
const { major, error, success, important, neutral, light, purpleBold} = require('../chalkLibrary');

// Constants
let arrayOfMessageColors = [major, error, success, neutral, important, light];
let counter = 0;


let connectPrompt = (email, channelName, channelUrl, username) => {
    const questions = [{
        name: 'channelFeedConnection',
        message: 'Please confirm you want to connect to channel feed.',
        type: 'confirm',
    }]
    inquirer.prompt(questions).then((answer) => {
        // Do we connect
        SB.connect(username, (user, error) => {
            console.log(`User successfully logged in with username ${username}`);
            console.log(`Attempting to connect to channel: ${channelName}`);
            clear()
            SB.OpenChannel.getChannel(channelUrl) // The channel URL is what allows us to connect to the actual channel in sendbird
            .then((openChannel, error) => {
                openChannel.enter((response, error) => {
                    if (error) {
                        console.log('Channel unsuccessfully entered.')
                        return;
                    }
                    console.log(purpleBold('Channel successfully entered. Messages will appear below.'))
                    var ChannelHandler = new SB.ChannelHandler();
                    ChannelHandler.onMessageReceived = (url, messageObject) => {
                        let { message } = messageObject;
                        let { userId } = messageObject._sender;
                        let finalMessage = userId + ': ' + message;
                        let lengthArray = arrayOfMessageColors.length;
                        let currentColor = arrayOfMessageColors[counter];
                        counter++;
                        counter == lengthArray ? counter = 0 : counter;
                        console.log(currentColor(userId) + ': ' + message);
                    }; // Channel handler needs to have unique id
                    SB.addChannelHandler(channelName, ChannelHandler); // NewFeature: Use a cryptographic module here to prevent collisions
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
