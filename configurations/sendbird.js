// Contains and initializes SendBird API - boom baby.

// Gotta add this require in order to make process.env available
// Safety is definitely the new sexy.
require('dotenv').config(); 

const SendBird = require('sendbird');
// var SB = new SendBird({appId: process.env.SENDBIRD_APP_ID});
var SB = new SendBird({appId: "EC4FFBC1-31DF-47DA-88A4-1AFE1771302E"});

module.exports.SB = SB;
