import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID
  };

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, googleAuthProvider, database as default};

// database.ref('expenses').once('value').then((snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot)=> {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses); 
// }).catch((e) => {
//     console.log(e);
// })

// database.ref().once('value').then((snapshot)=> {
//     console.log('data fetched:', snapshot.val());
// }).catch((e) => {
//     console.log('Got an error:', e);
// });

