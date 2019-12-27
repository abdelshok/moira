// File holding configuration and initalization of firebase module which we use in the application
// for authentication. Might be used in conjunction with AWS later on, if we replace Sendbird API
// with AWS WebSocket API, Amazon Elasticache, etc. to create a real time chat that's more scalable.

// Boilerplate code that allows us to access process.env

// // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: `${process.env.FIREBASE_API_KEY}`,
    authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
    databaseURL: `${process.env.FIREBASE_DB_URL}`,
    projectId: `${process.env.FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${process.env.FIREBASE_APP_ID}`,
    measurementId: `${process.env.FIREBASE_MEASUREMENT_ID}`,
};

const firebase = require('firebase');

// Initialize firebase with the correct credentials
firebase.initializeApp(firebaseConfig);

module.exports.firebase = firebase;