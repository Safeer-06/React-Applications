import './sign-in-up.css';
import  Signup from './Signup';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import fire from './firebase_config';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { findByTestId } from '@testing-library/dom';
import UserLoggedIn from './UserLoggedIn';
import { db } from './firebase_config';
import { Redirect } from "react-router-dom";
import { loginUser } from "./actions/auth";
import { useDispatch } from 'react-redux';
const SignIn = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loggedIn, setIsLoggedIn] = useState(false);
  const dbcollectionName = db.collection("users");
  const dispatch = useDispatch();
  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setName("");
  }
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }
 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div>
      <form className="container sign-in-form" autoComplete="off" onSubmit={(e)=>e.preventDefault()}>
        <legend><h4>Sign In</h4></legend>
        <div className="mb-3">
          <label htmlFor="email">Enter Email</label>
          <input type="email" value={email} className="form-control" id="email" onChange={(e) => {setEmail(e.target.value);}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Enter Password</label>
          <input type="password" value={password} className="form-control" id="password" onChange={(e) => {setPassword(e.target.value);}}/>
        </div>
          <button onClick={handleSubmit} className="btn btn-primary">Sign In</button>
          <Link to="/signup" style={{marginLeft: "30px"}}>Don't have an Account? Sign Up Instead</Link>
          <Link to="/" style={{marginLeft: "30px"}}>Go back to Home</Link>
        </form>
    </div>
  )
}

export default SignIn
