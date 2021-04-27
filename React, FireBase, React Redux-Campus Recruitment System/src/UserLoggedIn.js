import React, { useState, useEffect } from 'react';
import { logoutUser } from './actions/auth';
import { getData, deleteUser, getUserData } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
const UserLoggedIn = () => {
    // const [dataStudent, setDataStudent] = useState([]);
    // const [dataCompany, setDataCompany] = useState([]);
    const [datas, setDatas] = useState([]);
    const dispatch = useDispatch();
    const { user }=useSelector(state=>state.Reducer);
    useEffect(() => {
      getUserData(setDatas);
      // getData("student").then(students => setDataStudent(students.map(student => student.data())));
      // getData("student").then(stu => setDatauID(() => {console.log("this is admin: ", datauID);stu.map(stud => stud.id); console.log("this is admin: ", datauID);}));
      // console.log("this is admin: ", datauID);
      // getData("company").then(companies => setDataCompany(companies.map(comp => comp.data())));
    }, [])
    return (
    <section className="UserLoggedIn">
        <div>
          <nav>
              <Link to="/usermainpage"><h2>Welcome {user.name}</h2></Link>
              <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Students<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Companies</a>
                </li>
              </ul>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => {e.preventDefault(); console.log("logging out"); dispatch(logoutUser());}}>Logout</button>
            </div>
            </nav>
          </nav>
        </div> 
        <h1>List of Students: </h1> 
        {/* {dataStudent.map((student) => (
          <div style={{border: "5px solid black"}}>
            <h5>Name of Student: {student.name}</h5>
            <h5>Email of Student: {student.email}</h5>
          </div>
        ))} */}
        {datas.map((dat) => dat.type==="student"?(
        <div style={{border: "5px solid black"}}>
        <h5>Name of Student: {dat.name}</h5>
        <h5>Email of Student: {dat.email}</h5>
        <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => {e.preventDefault(); deleteUser(dat.id);}}>X</button>
        </div>
        ):null)}
        <br></br>
        <br></br>
        <h1>List of Companies: </h1> 
        {datas.map((dat) => dat.type==="company"?(
        <div style={{border: "5px solid black"}}>
        <h5>Name of Company: {dat.name}</h5>
        <h5>Email of Company: {dat.email}</h5>
        <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => {e.preventDefault(); deleteUser(dat.id);}}>X</button>
        </div>
        ):null)}
        </section>
    )
}

export default UserLoggedIn;
