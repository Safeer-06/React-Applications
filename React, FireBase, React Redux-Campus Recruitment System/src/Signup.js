import React from 'react'
import { Link,useHistory } from "react-router-dom";
import './sign-in-up.css';
import { useState } from "react";
import fire from './firebase_config';
import { db } from './firebase_config';
import firebase from "firebase";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("student");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const dbcollectionName = db.collection("users");
  let History = useHistory();
  const handleSignup = (e) => {
    e.preventDefault();
    fire
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then((val) => {
      console.log("This is value of id: ", val.user.uid);
      addSignUp(val.user.uid, name, email, password, type).then(() => clearInputs() );
      History.push('/signin');
      console.log("yep");
    })
    .catch(err => {
      //console.log("FIRE", err)
      switch(err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;   
      }
    });
  };
  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setName("");
    setType("student");
  }
  const addSignUp = (uID, name, email, password, type) => {
    //e.preventDefault();
    console.log("this is running");
   return dbcollectionName.doc(uID).set({
     name: name,
     email: email,
     password: password,
     type: type
   });
}

  return (
    <div>
    <div>
      <form className="container sign-up-form" autoComplete="off" onSubmit={handleSignup}>
        <legend><h4>Sign Up</h4></legend>
        <div className="mb-3">
          <label htmlFor="name">Enter Name</label>
          <input name="name" type="name" value={name} className="form-control" id="name" onChange={(e) => {setName(e.target.value);}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Enter Email</label>
          <input name="email" type="email" value={email} className="form-control" id="email" onChange={(e) => {setEmail(e.target.value);}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Enter Password</label>
          <input name="password" type="password" value={password} className="form-control" id="password" onChange={(e) => {setPassword(e.target.value);}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Choose Sign up Type:</label><br />
          <input type="radio" id="student" name="signup" value="student" checked={type==="student"} onChange={(e) => {setType(e.target.value);}}/>
          <label htmlFor="student">Student</label><br />
          <input type="radio" id="company" name="signup" value="company"checked={type==="company"} onChange={(e) => {setType(e.target.value)}}/>
          <label htmlFor="company">Company</label><br />
        </div>
        <div className="mb-3">
        </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
          <Link to="/signin" style={{marginLeft: "30px"}}>Already have an Account? Sign In Instead</Link>
          <Link to="/" style={{marginLeft: "30px"}}>Go back to Home</Link>
        </form>
    </div>
      {/* <Link to="/signup">Sign Up</Link> */}
    </div>
  )
}

export default Signup
