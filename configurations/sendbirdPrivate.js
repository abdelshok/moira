// Contains and inializes SendBird for private channels 
// Boom baby. Boom.
// It will therefore be called "sendbirdPrivate"

const Sendbird = require('sendbird');
const privateSB = new Sendbird({appId: `${process.env.PRIVATE_SENDBIRD_APP_ID}`});

module.exports.privateSB = privateSB;
