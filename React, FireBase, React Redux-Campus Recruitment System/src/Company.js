import React, { useState, useEffect } from 'react';
import { logoutUser } from './actions/auth';
import { getData } from './utils';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
const Company = () => {
  const [dataStudent, setDataStudent] = useState([]);
    const dispatch = useDispatch();
    const { user }=useSelector(state=>state.Reducer);
    useEffect(() => {
      getData("student").then(students => setDataStudent(students.map(student => student.data())));
    }, [])
    return (
    <section className="UserLoggedIn">
        <div>
          <nav>
              <h2>Welcome {user.name}</h2>
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
        </div> 
        <h1>THESE ARE STUDENTS</h1> 
        {dataStudent.map((student) => (
          <div style={{border: "5px solid black"}}>
            <h5>Name of student: {student.name}</h5>
            <h5>Email of Student: {student.email}</h5>
          </div>
        ))}
        {/* {getData("student", setDataStudent)}
        <h1>Name of Student: {dataStudent}</h1> */}
        </section>
    )
}

export default Company
