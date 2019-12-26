// Utility functions used in the getChannelListPrompt

// @findChannelName function 
// Takes the user channel choice, which is under the form "⛩  asap_mob  🐵 0 participants"
// and returns the channel name as a string, in this case: "asap_mob" 
// Input:
// channelString: ie. "⛩   asap_mob  🐵 0 participants "
// Output: 
// channel name (as a string)
function findChannelName (channelString) {
    if (channelString == "") {
        return false
    } else {
        // Channel name is always fourth string
        // Needs to be modified to be consistent. Either one or two spaces. 
        let channelName = splitChannelStringArray[3];
        return channelName;
    }
}

module.exports = {
    findChannelName,
}