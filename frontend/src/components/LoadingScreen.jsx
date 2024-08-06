import React from  'react';
import '../styles/LoadingScreen.css'; // Import CSS for styling
import Grass from '../assets/grass.jpg'

const LoadingScreen = ({ time }) => {
  return <>
        <img src={Grass} width="100vw" height="100vh" style={{zIndex: '-1', position: 'absolute', top: 0, left: 0, 
        width: '100vw', height: '100%', filter: 'brightness(90%)', opacity: "80%"}} />
        <div className="container">
            <p style = {{color: "white", marginBottom: '0.15vh'}}>Loading...</p>
            <div className="progress2 progress-moved">
                <div className="progress-bar2"></div>
            </div>
        </div>
   </>
};

export default LoadingScreen;
