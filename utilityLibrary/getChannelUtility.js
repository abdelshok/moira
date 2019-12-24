// Utility functions used in the getChannelListPrompt

// Function here takes the user channel choice, which is under the form
// of an "Emoji channelName Other Emoji NumberOfParticipants"

function findChannelName (channelString) {
    if (channelString == "") {
        return false
    } else {
        // console.log('Channels tring', channelString);
        let splitChannelStringArray = channelString.split(" ");
        // console.log(splitChannelStringArray);
        // console.log('Split channel', splitChannelStringArray);
        // Channel name is always fourth string
        // Needs to be modified to be consistent. Either one or two spaces. 
        let channelName = splitChannelStringArray[3];
        // console.log('Channel name after split', channelName);
        return channelName;
    }
}

module.exports = {
    findChannelName,
}