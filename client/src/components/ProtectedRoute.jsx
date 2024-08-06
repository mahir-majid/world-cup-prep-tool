import React, { useState, useEffect } from  'react';
import { Navigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

function ProtectedRoute({ children }) {
  const { isAuthorized } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading && isAuthorized) {
    return( 
      <div style = {{position: "absolute", height: "100%", marginTop: "0", width: "100%"}}>
        <LoadingScreen/>
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/accessdenied" />;
}

export default ProtectedRoute;
