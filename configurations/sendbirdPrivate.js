// Contains and inializes SendBird for private channels 
// Boom baby. Boom.
// It will therefore be called "sendbirdPrivate"

const Sendbird = require('sendbird');
// const privateSB = new Sendbird({appId: `${process.env.PRIVATE_SENDBIRD_APP_ID}`});
const privateSB = new Sendbird({appId: '555A63D4-C3FE-42D7-ABD0-C43B87A572E1'});

module.exports.privateSB = privateSB;
