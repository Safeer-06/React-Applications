import React from "react";
import { useState, useEffect } from "react";
import { logoutUser } from "./actions/auth";
import { getstuID, getStuVacancies, getUserData, getForBool } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "./firebase_config";
// export const applyJob = (compname, year, descript, posname, timings) => {
//   return (compname, year, descript, posname, timings);
// }
const StudentViewVacancy = () => {
  const { user } = useSelector((state) => state.Reducer);
  const [vacan, setVacan] = useState([]);
  const [datas, setDatas] = useState([]);
  const [hasApplied, setHasApplied] = useState(false);
  const dbVacanCollectionNameApplied = db.collection("appliedusers");
  //const dbcollectionNameNew = db.collection("vacancies").doc(vacancyID).collection("appliedusers").doc(user.id);
  //const [userEmail, setUserEmail] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getStuVacancies(setVacan);
  }, []);

  const isTrue = (id) => {
    var newid;
    // const uID = toString(user.id);
    // const vacanID = toString(id);
    console.log("this is UID: ", user.id);
    //console.log("this is vacanID: ", id);
    console.log("AppliedFirst:", hasApplied);//true
    db.collection('vacancies').doc(id)
    .collection('appliedusers').doc(user.id).get().then(function(doc) {
    if (doc.exists) {
      //console.log("Document data:", doc.data());
      //newid = doc.id;
      setHasApplied(true);
      //console.log("ID:", newid);
    } else {
      console.log("No such document!");
      //setHasApplied(false);
    }
    }).catch(function(error) {
    console.log("Error getting document:", error);
    //setHasApplied(false);
    });
    // console.log("new id new: ", newid);
    // if(newi===user.id){
    //   return true;  
    // }d
  //   db.collection("vacancies").doc(id).collection("appliedusers").get()
  //   .then(querySnapshot => {
  //   querySnapshot.forEach(doc => {
  //       console.log("these are the applied users:", doc.id, " => ", doc.data());
  //   });
  // });

} 
  
  return (
    <div>
      <section className="Student">
        <div>
          <nav>
            <Link to="/studentpage">
              <h2>Welcome</h2>
            </Link>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/studentvacancy">View Available Vacancies</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="ml-3">
                      View Your Profile
                    </Link>
                  </li>
                </ul>
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("logging out");
                    dispatch(logoutUser());
                  }}
                >
                  Logout
                </button>
              </div>
            </nav>
          </nav>
        </div>
      </section>
      <h1>Available Vacancies</h1>

      {/* {
      hasApplied? <button>hannan</button> :<button>safeer</button>
    } */}
      {vacan.map((vancy) => (
        <div style={{ border: "5px solid black" }}>
          <h5>Name of Company: {vancy.Company_Name}</h5>
          <h5>Established Year: {vancy.Established_Year}</h5>
          <h5>Job Description: {vancy.Job_Description}</h5>
          <h5>Job Timings: {vancy.Job_Timings}</h5>
          <h5>Position Name: {vancy.Position_Name}</h5>
          <Link
              to={{
                pathname: "/studentapplyvacancy",
                newprops: {
                  a: vancy.Company_Name,
                  b: vancy.Established_Year,
                  c: vancy.Job_Description,
                  d: vancy.Job_Timings,
                  e: vancy.Position_Name,
                  f: vancy.id
                },
              }}
            >
            <button className="btn btn-outline-success my-2 my-sm-0">
              {(isTrue(vancy.id)  && hasApplied) ? <p>Already Applied</p> : <p>Apply</p>}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default StudentViewVacancy;
