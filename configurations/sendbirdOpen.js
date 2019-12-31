// Contains and initializes SendBird API for open channels - boom baby.
// Which is why it's called "sendbirdOpen"

const SendBird = require('sendbird');
const openSB = new SendBird({appId: `${process.env.OPEN_SENDBIRD_APP_ID}`});

module.exports.openSB = openSB;
