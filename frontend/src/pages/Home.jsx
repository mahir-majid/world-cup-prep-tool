import React from  'react'
import MiniLoading from '../components/MiniLoading'
import "../styles/Home.css"
import { useNavigate } from  'react-router-dom'
import Grass from '../assets/grass.jpg'


function Home() {
  const navigate = useNavigate();

  const goTo = (page) => {
    navigate(page);
  }

  return <>
  <img src={Grass} width="100vw" height="100vh" style={{zIndex: '-1', position: 'absolute', 
    width: '100vw', height: '86.6vh', filter: 'brightness(90%)'}} />

    
  <div className = "home-wrapper">
    <h1 style={{marginTop: '0vh', fontSize: "60px", marginBottom: "0px"}}>2026 World Cup Prep Tool</h1>
    <p style = {{fontSize: "30px"}}> The easiest way to find and track your favorite nation's players</p>
    <button className = "start-button" onClick={() => goTo('/register')}> Get Started</button>
  </div>
  </>
}

export default Home
