// Sign Up-related Utility Functions
// Functions here will include storing the username and corresponding email 
// to the correct firebase database. future functions will include storing the user's
// phone number to the corresponding NoSQL database (NoSQL chosen here because the structure
// of the data is still not completely finalized - as I am not sure how far I want to take this project
// one million users? two billion? one hundred trillion? who knows, the sky is the limit here.)

// Firebase already initialized in configurations folder 
// Import here all of the necessary initializations to make it working
// require("firebase/firestore");
const firebase = require('../configurations/firebaseConfig');
const db = firebase.firestore();


// Store username in Firebase database with email 
// #improvements: later on store the number of the person to allow texts to be sent
// that also means that there needs to be a collection (database) that stores the name
// of the channels and the users currently in those channels 
// This could be simply in the existing channel list... But it might be too much data 
// when we're querying for a channel that comes back at once.
// Maybe it'd be better to have another DB that will hold the channel name 
// and the channel users

const addUsernameAndEmailToFirebase = (username, email) => {
    if (username == '' &&  email == '') {
        return false; 
    } else {
        // #toDisable
        console.log('Username and email will be stored in the corresponding database');
        db.collection('users').doc(email).set({
            userName: username, 
            phoneNumber: phoneNumber
        })
    }
}

