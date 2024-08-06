import { useState } from  'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Teams from './pages/Teams'
import AccessDenied from './pages/AccessDenied'
import { AuthProvider } from './contexts/AuthContext'

function App() {

  return (
    <>
      <Router>
          <AuthProvider>
            <Navbar />
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/teams" element={<ProtectedRoute><Teams/></ProtectedRoute>}></Route>
                <Route path="/accessdenied" element={<AccessDenied />}></Route>

              </Routes>
          </AuthProvider>
      </Router>
     
    </>
  )
}

export default App
