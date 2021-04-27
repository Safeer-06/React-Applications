import logo from './logo.svg';
import './App.css';
import  Signup from './Signup';
import SignIn from './SignIn';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'; 
function App() {
  //const { isAuthenticated }=useSelector(state=>state.Reducer);
  // const consoleshow = () => {
  //   console.log("sasfsf", isAuthenticated);
  // }
  return (
    <div className="App">
    <div className="mainPage">
      <div className="container white">
        <h1>Welcome to the Campus Recruitement System!</h1>
        <br></br>
        <h3>Click on the links below to proceed</h3>
        <br></br>
        <Link to="/signin">Sign In</Link>
        <br></br>
        <br></br>
        <Link to="/signup">Sign Up</Link>
        <br></br>
        <br></br>
        <h3>Created by Safeer Humayoon</h3>
      </div>
    </div>
    </div>
  );
}

export default App;
