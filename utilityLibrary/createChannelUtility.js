// CreateChannelUnitility
// - Utility Functions used within the CreateChannelprompt

function isThereWhitespace(passedString) {
    let trimmedString = passedString.trim();
    let arrayString = trimmedString.split(' ');
    if (arrayString.length > 1) {
        return false;
    } else if (arrayString.length == 1) {
        return true;
    }
}

module.exports = {
    isThereWhitespace,
}
