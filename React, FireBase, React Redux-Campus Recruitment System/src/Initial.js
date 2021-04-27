import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import SignIn from './SignIn';
import Signup from './Signup';
import App from './App';
import UserLoggedIn from './UserLoggedIn';
import { useSelector } from 'react-redux';
import Student from './Student';
import Company from './Company';
import Vacancies from './Vacancies';
import View from './ViewVacancies';
import StudentVacancy from './StudentViewVacancy';
import ApplyVacancy from './ApplyVacancy';
//import { Link } from "React-router-dom";
const Initial = () => {
    const { isAuthenticated }=useSelector(state=>state.Reducer);
    const { user }=useSelector(state=>state.Reducer);
    console.log("this is: ", user);
    console.log("this is type: ", user.type);
    return (
        <div>
        <Router>
            <Switch>
                {!isAuthenticated && <Route path='/signin' component={SignIn} />}
                {!isAuthenticated && <Route path='/signup' component={Signup} />} 
                {!isAuthenticated && <Route exact path='/' component={App} />} 
                {!isAuthenticated && <Route path='*' component={() => <Redirect to="/"/>} />}  
                {isAuthenticated && user.type==="admin" && <Route path='/usermainpage' component={UserLoggedIn} />} 
                {isAuthenticated && user.type==="student" && <Route path='/studentpage' component={Student} />}
                {isAuthenticated && user.type==="student" && <Route path='/studentvacancy' component={StudentVacancy} />}
                {isAuthenticated && user.type==="student" && <Route path='/studentapplyvacancy' component={ApplyVacancy} />}
                {isAuthenticated && user.type==="company" && <Route path='/companypage' component={Company} />}
                {isAuthenticated && user.type==="company" && <Route path='/newVacancy' component={Vacancies} />}
                {isAuthenticated && user.type==="company" && <Route path='/viewVacancy' component={View} />}
                {isAuthenticated && <Route path='*' component={() => <Redirect to={user.type==="admin"?"/usermainpage":user.type==="student"?"/studentpage":"/companypage"} />} />}
            </Switch>
        </Router>
        </div>
    )
}

export default Initial
