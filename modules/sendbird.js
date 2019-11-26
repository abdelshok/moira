// Contains and initializes SendBird API - boom baby.

// Gotta add this require in order to make process.env available
// Safety is definitely the new sexy.
require('dotenv').config(); 

const SendBird = require('sendbird');
var SB = new SendBird({appId: process.env.SENDBIRD_APP_ID});

module.exports.SB = SB;
