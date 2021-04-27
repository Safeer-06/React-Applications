// import { SIGNUP_SUCCESS, SIGNUP_ERROR } from "./actionTypes";
// import { SIGNIN_SUCCESS, SIGNIN_ERROR } from "./actionTypes";
// import firebase from "../../services/firebase";
// Signing up with Firebase
import fire from "../firebase_config";
import { db } from '../firebase_config';
import { getName } from '../utils';
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";


const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};


const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};
export const loginUser = (email, password) => dispatch => {
  //dispatch(requestLogin());
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((v) => {
      console.log("it has signed in", v);
      dispatch(getType(v.user.uid));
      //dispatch(receiveLogin(v));
    })
    .catch(error => {
      //Do something with the error if you want!
      console.log("it has error ", error);
      dispatch(loginError());
    });
};

const getType = (uID) => dispatch => {
  const dbID = db.collection("users").doc(uID);
  console.log("Document data uid: ", uID);
  // dbID.where("type", "==", true);
  dbID.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        console.log("Document ID:", doc.id);
        console.log("Document:", doc);
        // console.log("Document data type:", doc.data().type);
        // if(doc.data().type==="company")
        // {
        //   dispatch(getName(doc.data().name));
        //   dispatch(receiveLogin(doc.data()));
        // }
        dispatch(receiveLogin({ ...doc.data(), id: doc.id }));
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        dispatch(loginError());
    }
}).catch((error) => {
    console.log("Error getting document:", error);
    dispatch(loginError());
});
}

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  fire
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
      //Do something with the error if you want!
      dispatch(logoutError());
    });
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  fire
    .auth()
    .onAuthStateChanged(user => {
      if (user !== null) {
        dispatch(receiveLogin(user));
      }
      dispatch(verifySuccess());
    });
};
// export const signup = (email, password) => async dispatch => {
//   try {
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then(dataBeforeEmail => {
//         firebase.auth().onAuthStateChanged(function(user) {
//           user.sendEmailVerification();
//         });
//       })
//       .then(dataAfterEmail => {
//         firebase.auth().onAuthStateChanged(function(user) {
//           if (user.emailVerified) {
//             // Email is verified
//             dispatch({
//               type: SIGNUP_SUCCESS,
//               payload:
//                 "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."
//             });
//           } else {
//             // Email is not verified
//             dispatch({
//               type: SIGNUP_ERROR,
//               payload:
//                 "Something went wrong, we couldn't create your account. Please try again."
//             });
//           }
//         });
//       })
//       .catch(function(error) {
//         dispatch({
//           type: SIGNUP_ERROR,
//           payload:
//             "Something went wrong, we couldn't create your account. Please try again."
//         });
//       });
//   } catch (err) {
//     dispatch({
//       type: SIGNUP_ERROR,
//       payload:
//         "Something went wrong, we couldn't create your account. Please try again."
//     });
//   }
// };


// // Signing in with Firebase
// export const signin = (email, password, callback) => async dispatch => {
//   try {
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(() => {
//         dispatch({ type: SIGNIN_SUCCESS });
//         callback();
//       })
//       .catch(() => {
//         dispatch({
//           type: SIGNIN_ERROR,
//           payload: "Invalid login credentials"
//         });
//       });
//   } catch (err) {
//     dispatch({ type: SIGNIN_ERROR, payload: "Invalid login credentials" });
//   }
// };