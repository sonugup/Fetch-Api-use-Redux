import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './Home'
import Error from './Error';
import MainPage from './MainPage';
import Navbar from './Navbar';
import Resistor from './Login/Resistor';
import Login from './Login/Login';
const AllRoute = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<MainPage />} />
      
        <Route path="/login" element={<Login />} />
        <Route path="/resistor" element={<Resistor />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Error />} />
        
      </Routes>
    </div>
  )
}

export default AllRoute
