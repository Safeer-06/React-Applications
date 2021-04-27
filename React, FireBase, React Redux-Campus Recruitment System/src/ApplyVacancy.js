import React from 'react'
import { useState, useEffect } from 'react';
import { logoutUser } from './actions/auth';
import { getData, getstuID } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { db } from './firebase_config';
//import { applyJob } from './StudentViewVacancy';
const ApplyVacancy = (props) => {
  const { user }=useSelector(state=>state.Reducer);
  const [stuName, setStuName] = useState(user.name);
  const [stuEmail, setStuEmail] = useState(user.email);
  const [coverLetter, setCoverLetter] = useState();
  const [experience, setExperience] = useState();
  const [uID, setUID] = useState();
  const [posName, setPosName] = useState();
  const [timings, setTimings] = useState();
  const vacancyID = props.location.newprops.f;
  const userID = user.id;
  const dbcollectionName = db.collection("vacancies").doc(vacancyID).collection("appliedusers").doc(userID);
  //const dbcollectionName = db.collection("appliedusers");
  //db.collection('rooms').doc('roomA').collection('messages').doc('message1');
  const [datas, setDatas] = useState([]);
  const dispatch = useDispatch();
  const clearInputs = () => {
    setStuName("");
    setStuEmail("");
    setCoverLetter("");
    setExperience("");
  }
  const AddVacancy = (e) => {
    e.preventDefault();
    //console.log("this is uID: ", ID);
    dbcollectionName.set({
      // Company_Name: props.location.newprops.a,
      // Job_Timings: props.location.newprops.d,
      // Job_Description: props.location.newprops.c,
      // Position_Name: props.location.newprops.e,
      // Established_Year: props.location.newprops.b,
      //User_ID : ID,
      Student_Email: stuEmail,
      Student_Name: stuName,
      Cover_Letter: coverLetter,
      Student_Experience: experience
    });
    console.log("worked");
    clearInputs();
  }
  return (
    <div>
      <nav>
            <Link to="/studentpage"><h2>Welcome</h2></Link>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                  <Link to="/studentvacancy">View Available Vacancies</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="ml-3">View Your Profile</Link>
                </li>
              </ul>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => {e.preventDefault(); console.log("logging out"); dispatch(logoutUser());}}>Logout</button>
            </div>
            </nav>
          </nav>
          <div>
      <form className="container sign-up-form" autoComplete="off" onSubmit={AddVacancy}>
        <legend><h4>Fill Below Form to Apply for Job Position</h4></legend>
        <div className="mb-3">
          <label htmlFor="name">Enter Your Name</label>
          <input name="stuname" type="name" value={stuName} className="form-control" id="stuname" onChange={(e) => {setStuName(e.target.value);}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="name">Enter Your Email</label>
          <input name="stuemail" type="name" value={stuEmail} className="form-control" id="stumail" onChange={(e) => {setStuEmail(e.target.value);}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="name">Enter Experience</label>
          <input name="stuexp" type="name" value={experience} className="form-control" id="stuexp" onChange={(e) => {setExperience(e.target.value);}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="name">Enter cover letter</label>
          <input name="stulett" type="name" value={coverLetter} className="form-control" id="stulett" onChange={(e) => {setCoverLetter(e.target.value);}}/>
        </div>
          <button type="submit" className="btn btn-primary mb-2">Apply</button>
          <Link to="/studentvacancy" style={{marginLeft: "30px"}}>Go back</Link>
        </form>
    </div>
    </div>
  )
}

export default ApplyVacancy
