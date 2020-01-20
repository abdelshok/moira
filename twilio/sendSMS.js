// File that will contain Twilio-based functions which will send SMS
// to the users of this application

// Might have to take Twilio Authentication out of here if we are going to 
// user more functionalities than sendSMS
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const godPhoneNumber = process.env.TWILIO_GOD_PHONENUMBER;
// const boughtPhoneNumberOne = process.env.TWILIO_PHONE_NUMBER_ONE;


const accountSid = 'ACd02cffad0a938b0aa67c3b3fdecd4f88';
const authToken = '7e7dca32f3e4025c454bdf49915db378';
const godPhoneNumber = '+19174157475';
const boughtPhoneNumberOne = '+16503186078';

const client = require('twilio')(accountSid, authToken);

// @sendMessageToGod
// Will notify God (me) that a user is connected to a channel while alos providing
// information about said user
// Input (3):
// - userEmail
// - username
// - channelName: channel the user is connected to
// Output:
// None. Will rely on the Twilio API to notify God (or me if he/she doesn't answer)
function notifyGodUserIsOnline(userEmail, username, channelName) {
    client.messages
      .create({
         body: `User: ${username} with email: ${userEmail} is now online on channel: ${channelName}. Connect to LMFAO and join the party. \n 🙊 🙉 🙈`,
         from: `${boughtPhoneNumberOne}`,
         to: `${godPhoneNumber}`
       })
      .then(message => console.log()); // console.log(message.sid
}

module.exports = {
    notifyGodUserIsOnline
}
