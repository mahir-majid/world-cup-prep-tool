import React from  'react'
import '../styles/Navbar.css'
import { useNavigate } from  'react-router-dom'
import {useAuth} from "../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const {isAuthorized} = useAuth();
  const { logout } = useAuth();


  const goTo = (page) => {
    navigate(page);
  }

  return <>
    <div className="nav-bar-top-div"></div>
      <div className="nav-bar">
        <div className = "left-box">
          <button className = "nav-button" onClick={() => goTo('/')}>Home</button>
          <button className = "nav-button" onClick={() => goTo('/teams')}>National Teams</button>
        </div>
        <div className = "right-box">
          {!isAuthorized &&  <button className = "nav-button" onClick={() => goTo('/login')}>Login</button> }
          {!isAuthorized && <button style = {{backgroundColor: "DarkOrchid", color: "white", marginRight: '3vw'}} 
            className = "nav-button" onClick={() => goTo('/register')}>Register</button>}
          {isAuthorized &&  <button className = "nav-button" onClick={() => logout()}>Log Out</button> }
        </div>
      </div>
    <div className="nav-bar-bottom-div"></div>
  </>
} 

export default Navbar
