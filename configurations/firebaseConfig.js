// File holding configuration and initalization of firebase module which we use in the application
// for authentication. Might be used in conjunction with AWS later on, if we replace Sendbird API
// with AWS WebSocket API, Amazon Elasticache, etc. to create a real time chat that's more scalable.

// Boilerplate code that allows us to access process.env

// // Your web app's Firebase configuration
// var firebaseConfig = {
//     apiKey: `${process.env.FIREBASE_API_KEY}`,
//     authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
//     databaseURL: `${process.env.FIREBASE_DB_URL}`,
//     projectId: `${process.env.FIREBASE_PROJECT_ID}`,
//     storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
//     messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
//     appId: `${process.env.FIREBASE_APP_ID}`,
//     measurementId: `${process.env.FIREBASE_MEASUREMENT_ID}`,
// };

var firebaseConfig = {
    apiKey: 'AIzaSyDWPhI_9mRgvL9xf80f8874gdP7fjETw3c',
    authDomain: 'moira-1994.firebaseapp.com',
    databaseURL: 'https://moira-1994.firebaseio.com',
    projectId: 'moira-1994',
    storageBucket: 'moira-1994.appspot.com',
    messagingSenderId: '1010140987203',
    appId: '1:1010140987203:web:942842b6a55035788ab9f6',
    measurementId: 'G-LBX4VF54JH',
};

const firebase = require('firebase');

// Initialize firebase with the correct credentials
firebase.initializeApp(firebaseConfig);

module.exports.firebase = firebase;