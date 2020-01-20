// Contains and initializes SendBird API for open channels - boom baby.
// Which is why it's called "sendbirdOpen"

const SendBird = require('sendbird');
// const openSB = new SendBird({appId: `${process.env.OPEN_SENDBIRD_APP_ID}`});

const openSB = new SendBird({appId: 'EC4FFBC1-31DF-47DA-88A4-1AFE1771302E'});
module.exports.openSB = openSB;
