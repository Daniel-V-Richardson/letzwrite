import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCmQdldg9r7rBnLw5kV2se-aeDGbhhcHy4",
    authDomain: "letzwrite-2ea56.firebaseapp.com",
    projectId: "letzwrite-2ea56",
    storageBucket: "letzwrite-2ea56.appspot.com",
    messagingSenderId: "918659062219",
    appId: "1:918659062219:web:8a64e43fd1765f9e09be4e"
  };

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
