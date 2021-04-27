import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAY3Oyy3yMjPWzXMyy6cRQr4dnzRV6t4oY",
  authDomain: "todo-app-101ac.firebaseapp.com",
  projectId: "todo-app-101ac",
  storageBucket: "todo-app-101ac.appspot.com",
  messagingSenderId: "295551391905",
  appId: "1:295551391905:web:7027a79eba6ba390adb8e0"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export {db};