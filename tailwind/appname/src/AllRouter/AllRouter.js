// import React from 'react'

// const AllRouter = () => {
//   return (
//     <div>AllRouter</div>
//   )
// }

// export default AllRouter

// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Components/Pages/Home';
import Login from '../Components/Login';
import Dashboard from '../Components/Pages/Dashboard';
import NotFound from '../Components/Pages/NotFound';
import Navbar from '../Components/Navbar/Navbar';
import PriveteRoute from '../Components/PriveteRoute/PriveteRoute';


const AllRouter = () => {
    return (
        // <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<PriveteRoute><Dashboard /></PriveteRoute>} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>


        // </Router>
    );
};

export default AllRouter;
