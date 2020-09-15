import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBFmT_6TqRmzxNZmXPEXmacIqe7etaBAcE",
    authDomain: "itemmaster-42bf4.firebaseapp.com",
    databaseURL: "https://itemmaster-42bf4.firebaseio.com",
    projectId: "itemmaster-42bf4",
    storageBucket: "itemmaster-42bf4.appspot.com",
    messagingSenderId: "626076376699",
    appId: "1:626076376699:web:f1dbcaa10bd6dd8b188cde"
  };

const app=firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();