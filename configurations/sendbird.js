// Contains and initializes SendBird API - boom baby.


const SendBird = require('sendbird');
var SB = new SendBird({appId: `${process.env.SENDBIRD_APP_ID}`});

module.exports.SB = SB;
