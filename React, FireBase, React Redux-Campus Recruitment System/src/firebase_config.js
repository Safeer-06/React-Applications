//import * as firebase from "firebase/app";
import firebase from 'firebase';
//import "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyDbgxP8Fx0tk0TAHPfh2E31tItyiGzUGNI",
  authDomain: "campusapp-ae7f6.firebaseapp.com",
  projectId: "campusapp-ae7f6",
  storageBucket: "campusapp-ae7f6.appspot.com",
  messagingSenderId: "68195343443",
  appId: "1:68195343443:web:379b4df5d53cb155b13aa6"
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
const db = firebase.firestore();
export {db};