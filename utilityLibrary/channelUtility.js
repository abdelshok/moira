// Utility functions related to finding, creating, iterating
// through channels

// findChannelCountAndUrl
// Function that finds all the open channels in sendbird and there
// respective user count
// Input:
// openChannels: array of objects each representing a different channel
// Output:
// Array of arrays where the first index of each array is the channel url
// and the second index is the channel participant count
// ie. [['general_chat', 20], ['channel_one', 4]]
function findChannelCountAndUrl(openChannels) {
    let length = openChannels.length;
    let arrayOfChannels = []
    if (length == 0) {
        return arrayOfChannels;
    } else if (length > 0) {
        for (let i=0; i<length; i++) {
            let currentChannelObject = openChannels[i];
            // Remember that the URL is automatically set if not created in the Sendbird Dashboard
            // What we're looking for as an attribute is the name of the channel, not it's URL
            let channelArray = [currentChannelObject.name, currentChannelObject.participantCount]; // Two variables
            // inside the returned channel object by the Sendbird API
            arrayOfChannels.push(channelArray);
        }
        // Once we pushed all of the open channels in the array
        return arrayOfChannels;
    }
}
// Figure something out for if there are 2000 channels available
// Probably need to implement a search feature that will find channels
// with a matching prefix.

// Also feature needs to list the amount of open channels available to the user.

// reformatChannelArray
// Reformats the array of channels into an array of strings that will become
// the list of channel options displayed to the user through the inquirer prompt
// Input:
// channelArray (object) of the form [['general_chat', 2], ['channel_one', 0]]
// Output:
// array of the form [ `Channel 🌔 : general_chat  Participants 🐵: 2`,  `Channel 🌔 : channel_one  Participants 🐵: 0`]
function reformatChannelArray(channelArray) {
    let arrayOfFormattedChannels = [];
    let length = channelArray.length;
    if (length == 0) {
        return []
    } else if (length > 0) {
        
        for (let i=0; i<length; i++) {
            let currentChannelElement = channelArray[i];
            let channelName = currentChannelElement[0];
            let channelCount = currentChannelElement[1];
            const newString =  `⛩   ${channelName}  🐵 ${channelCount} participants `
            arrayOfFormattedChannels.push(newString);
        }
        return arrayOfFormattedChannels;
    }
}
module.exports = {
    findChannelCountAndUrl,
    reformatChannelArray,
}