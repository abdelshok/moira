// Contains and initializes SendBird API for open channels - boom baby.
// Which is why it's called "sendbirdOpen"

const SendBird = require('sendbird');
// const openSB = new SendBird({appId: `${process.env.OPEN_SENDBIRD_APP_ID}`});

const openSB = new SendBird({appId: '9E08E706-8CB1-4220-9E0C-13D931D8BA7F'});
module.exports.openSB = openSB;
