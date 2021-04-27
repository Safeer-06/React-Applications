import React, { useState, useEffect } from 'react';
import { logoutUser } from './actions/auth';
import { getData } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { db } from './firebase_config';
const Vacancies = () => {
  const { user }=useSelector(state=>state.Reducer);
  const [compName, setCompName] = useState(user.name);
  const [year, setYear] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [posName, setPosName] = useState();
  const [timings, setTimings] = useState();
  const dbcollectionName = db.collection("vacancies");
  const dispatch = useDispatch();
  const clearInputs = () => {
    setCompName("");
    setYear("");
    setJobDescription("");
    setPosName("");
    setTimings("");
  }
  const AddVacancy = (e) => {
    e.preventDefault();
    dbcollectionName.add({
      Company_Name: compName,
      Job_Timings: timings,
      Job_Description: jobDescription,
      Position_Name: posName,
      Established_Year: year 
    });
    clearInputs();
  }
  return (
    <div>
      <nav>
            <Link to="/companypage">
              <h2>Welcome</h2>
            </Link>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/newVacancy">Add New Vacancy</Link>
                </li>
                <li className="nav-item">
                <Link to="/viewVacancy" className="ml-3">Your Vacancies</Link>
                </li>
                <li className="nav-item">
                <Link to="/" className="ml-3">View Your Company Profile</Link>
                </li>
              </ul>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => {e.preventDefault(); console.log("logging out"); dispatch(logoutUser());}}>Logout</button>
            </div>
            </nav>
          </nav>
          <div>
      <form className="container sign-up-form" autoComplete="off" onSubmit={AddVacancy}>
        <legend><h4>Fill Below Form to add Vacancy</h4></legend>
        <div className="mb-3">
          <label htmlFor="name">Enter Company Name</label>
          <input name="name" type="name" value={compName} className="form-control" id="name" onChange={(e) => {setCompName(e.target.value);}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Enter Established Year</label>
          <input name="year" type="number" value={year} className="form-control" id="year" onChange={(e) => {setYear(e.target.value);}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Enter Job Description</label>
          <input name="jobdescription" type="name" value={jobDescription} className="form-control" id="jobdescription" onChange={(e) => {setJobDescription(e.target.value);}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Enter Position Name</label>
          <input name="positionname" type="name" value={posName} className="form-control" id="positionname" onChange={(e) => {setPosName(e.target.value);}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Enter Timings</label>
          <input name="timings" type="name" value={timings} className="form-control" id="timings" onChange={(e) => {setTimings(e.target.value);}}/>
        </div>
        <div className="mb-3">
        </div>
          <button type="submit" className="btn btn-primary">Add new Vacancy</button>
        </form>
    </div>
    </div>
  )
}

export default Vacancies
