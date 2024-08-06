import React from 'react'
import Grass from '../assets/grass.jpg'
import { useEffect } from 'react'

function AccessDenied() {

  useEffect(() => {
    // Set the overflow to hidden on component mount
    document.body.style.overflow = 'hidden';

    // Cleanup function to reset the overflow when the component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return <>
  <img src={Grass} style={{zIndex: '-1', position: 'absolute', 
    width: '100vw', height: '86.6vh', filter: 'brightness(80%)'}} />
  <h1 style={{textAlign: 'center', marginTop: '25vh', 
    color: 'white', transform: 'rotate(-1.1deg)'}}>Please Log In to Access the 2026 World Cup Prep Tool's National Teams Feature</h1>
  
  </>
}

export default AccessDenied
