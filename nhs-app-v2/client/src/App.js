import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { toast } from "react-toastify";

//pages
//front
import Help from "./pages/front/Help"
import Home from "./pages/front/Home"
import GetVolunteers from "./pages/front/GetVolunteers"
import GetTutor from "./pages/front/GetTutors"
import Login from "./pages/front/Login"
import Register from "./pages/front/Register"
//admin
import Admin from "./pages/admin/Admin";
import AdminAnnouncements from './pages/admin/admin_components/Announcements';
import Build from './pages/admin/admin_components/Build'
import AdminDashboard from './pages/admin/admin_components/Dashboard';
import People from './pages/admin/admin_components/People';
import Controls from "./pages/admin/admin_components/Controls";
//member
import Member from "./pages/member/Member"
import MemberAnnouncements from './pages/member/member_components/Announcements';
import Events from './pages/member/member_components/Events';
import Profile from './pages/member/member_components/Profile';
import Schedule from './pages/member/member_components/Schedule'
import Tutoring from './pages/member/member_components/Tutoring';
import Issue from './pages/member/member_components/Issue'

toast.configure();



function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });
      
      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
      console.warn(err.responseText)
    }
  };

  useEffect(() => {
    console.log("running is verify")
    checkAuthenticated();
  }, []);
  

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [accountType, setAccountType] = useState(localStorage.getItem("accountType"))

  

const setType = (val) => {
  setAccountType(val)
}
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/help" element={<Help/>}/>
          <Route path="/get-volunteers" element={<GetVolunteers/>}/>
          <Route path="/get-tutor" element={<GetTutor/>}/>
          
          <Route exact path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth} setType={setType}/>) : (<Navigate replace to={`/${accountType}`}/>)}/>


          <Route exact path="/register" element={!isAuthenticated ? (<Register setAuth={setAuth} setType={setType}/>) : (<Navigate replace to={`/${accountType}`}/>)}/>
          {/* <Route exact path="/dashboard" element={isAuthenticated ? (<Dashboard setAuth={setAuth}/>) : (<Navigate replace to="/login"/>)}/> */}

          <Route exact path="/member" element={isAuthenticated ? (<Member setAuth={setAuth}/>) : (<Navigate replace to="/login"/>)}>
            <Route index element={<Schedule/>}/>
            <Route path="events" element={<Events/>}/>
            <Route path="tutoring" element={<Tutoring/>}/>
            <Route path="announcements" element={<MemberAnnouncements/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="issue" element={<Issue/>}/>
          </Route>
          <Route exact path="/admin" element={isAuthenticated ? (<Admin setAuth={setAuth}/>) : (<Navigate replace to="/login"/>)}>
            <Route index element={<AdminDashboard/>}/>
            <Route path="announcements" element={<AdminAnnouncements/>}/>
            <Route path="build" element={<Build/>}/>
            <Route path="people" element={<People/>}/>
            <Route path="controls" element={<Controls/>}/>
          </Route>
          


          
        </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;


/*

<Route path="/member/events" element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : (<Navigate replace to="events"/>)}/>
          <Route path="/member/schedule" element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : (<Navigate replace to="/member"/>)}/>

          

          
          <Route path="/username/announcements" element={<MemberAnnouncements/>}/>
          <Route path="/username/tutoring" element={<Tutoring/>}/>
          <Route path="/username/events" element={<Events/>}/>
          <Route path="/username/profile" element={<Profile/>}/>

          <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
          <Route path="/admin/people" element={<People/>}/>
          <Route path="/admin/announcements" element={<AdminAnnouncements/>}/>
          <Route path="/admin/build" element={<Build/>}/>
*/


/*
<Route path="/" element={<Home/>}/>
          <Route path="/help" element={<Help/>}/>
          <Route path="/get-volunteers" element={<GetVolunteers/>}/>
          <Route path="/get-tutor" element={<GetTutor/>}/>
          <Route exact path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : (<Navigate replace to="/dashboard"/>)}/>
          <Route exact path="/register" element={!isAuthenticated ? (<Register setAuth={setAuth}/>) : (<Navigate replace to="/dashboard"/>)}/>
          <Route exact path="/dashboard" element={isAuthenticated ? (<Dashboard setAuth={setAuth}/>) : (<Navigate replace to="/login"/>)}/>


          <Route path="/username/schedule" element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : (<Navigate replace to="/dashboard"/>)}/>
          <Route path="/username/announcements" element={<MemberAnnouncements/>}/>
          <Route path="/username/tutoring" element={<Tutoring/>}/>
          <Route path="/username/events" element={<Events/>}/>
          <Route path="/username/profile" element={<Profile/>}/>

          <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
          <Route path="/admin/people" element={<People/>}/>
          <Route path="/admin/announcements" element={<AdminAnnouncements/>}/>
          <Route path="/admin/build" element={<Build/>}/>

          */