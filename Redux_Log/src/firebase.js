import firebase from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAnBQeIMh7iBXjmjBl5zYngffniz544oRo",
    authDomain: "redux-firebase-auth-3c700.firebaseapp.com",
    projectId: "redux-firebase-auth-3c700",
    storageBucket: "redux-firebase-auth-3c700.appspot.com",
    messagingSenderId: "43533641138",
    appId: "1:43533641138:web:f1b5fe95cda8c946fdf0ab"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  export {auth};