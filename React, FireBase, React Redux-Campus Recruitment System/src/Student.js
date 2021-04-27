import React, { useState, useEffect } from 'react';
import { logoutUser } from './actions/auth';
import { getData } from './utils';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { db } from './firebase_config';
import { useSelector } from 'react-redux';

const Student = () => {
  const [companies, setCompanies] = useState([]);
  const dispatch = useDispatch();
  const { user }=useSelector(state=>state.Reducer);
  useEffect(() => {
    console.log("this is user ID: ", user.id);
    getData("company").then(companies => setCompanies(companies.map(company => company.data())));
  }, [])
  return (
    <div>
      <section className="Student">
        <div>
          <nav>
              <Link to="/studentpage"><h2>Welcome {user.name}</h2></Link>
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
        </div> 
        <h1>THESE ARE COMPANIES</h1> 
        {companies.map((student) => (
          <div style={{border: "5px solid black"}}>
            <h5>Name of Company: {student.name}</h5>
            <h5>Email of Company: {student.email}</h5>
          </div>
        ))}
        {/* {getData("student", setDataStudent)}
        <h1>Name of Student: {dataStudent}</h1> */}
        </section>
    </div>
  )
}

export default Student
