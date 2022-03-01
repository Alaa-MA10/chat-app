import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyC9jxE28G21KhLZTUr9HauqCRInpxjlR8I",
    authDomain: "unichat-44691.firebaseapp.com",
    projectId: "unichat-44691",
    storageBucket: "unichat-44691.appspot.com",
    messagingSenderId: "435524674937",
    appId: "1:435524674937:web:582832a047642f987e3ba8",
  })
  .auth();
