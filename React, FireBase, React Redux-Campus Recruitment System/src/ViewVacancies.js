import React from 'react'
import { useState, useEffect } from 'react';
import { logoutUser } from './actions/auth';
import { getData, deleteUser, getName, getVacancies } from './utils';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { db } from './firebase_config';
import { useSelector } from 'react-redux';
const ViewVacancies = () => {
  const dispatch = useDispatch();
  const [namecomp, setNameComp] = useState("");
  const [vacan, setVacan] = useState([]);
  // const getVacancies = () => {
  //   console.log("getting name");
  //   setNameComp(getName());
  //   console.log("this is name: ", namecomp);
  // }
  const { user }=useSelector(state=>state.Reducer);
  useEffect(() => {
    console.log("this is : ", user);
    console.log("tassfafs ", user.name);
    getVacancies(user.name).then(vacan => setVacan(vacan.map(vacans => vacans.data())));
  }, [])
  return (
    <div>
          <nav>
              <h2>Welcome</h2>
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
          <h1>These are your added vacancies:</h1>
          {vacan.map((vacanc) => (
          <div style={{border: "5px solid black"}}>
            <h5>Name of Company: {vacanc.Company_Name}</h5>
            <h5>Established Year: {vacanc.Established_Year}</h5>
            <h5>Job Description: {vacanc.Job_Description}</h5>
            <h5>Job Timings: {vacanc.Job_Timings}</h5>
            <h5>Position Name: {vacanc.Position_Name}</h5>
          </div>
        ))}
        </div> 
  )
}

export default ViewVacancies
