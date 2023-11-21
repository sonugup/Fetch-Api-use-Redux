
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaUserAlt} from "react-icons/fa"
import {MdEmail} from "react-icons/md"
import {RiLockPasswordLine} from "react-icons/ri"
import {CiLogin} from "react-icons/ci"

const Login = () => {

  const [state, setState]=useState({
    email:"",
    password:"",

  })
  
  const {email, password} =state;

  const handleSubmit=(event) => {
    event.preventDefault();
   
  }
    
  const hendlechenge = () => {

  }

    
      return (
        <div className='mainpage'>
        <div className="d-flext w-100 vh-100 justify-content-center align-items-center">
          
          <div className="w-50 shadow-lg h-100 mb-5 bg-secondary  text-dark bg-opacity-50 rounded border  text-white p-5">
            <h1> <FaUserAlt/> Welcome Back!</h1>
            <hr/>
            <form onSubmit={handleSubmit}>
            {/*  */}
              <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                    <MdEmail/>
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  aria-describedby="emailHelp"
                  onChange={hendlechenge}
                  value={email}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label"><RiLockPasswordLine/> Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={hendlechenge}
                  value={password}
                  required
                />
                </div>
              

              <button type="submit" className="btn  btn-success">
                Login <CiLogin/>
              </button> 
              <div className="mt-5 text-center bg-secondary p-3 text-dark bg-opacity-50 rounded text-white">
              <span>Don't have an account? <Link to="/resistor" className="bg-secondary p-2 text-white bg-opacity-75 rounded border-none text-decoration-none">Sign UP <CiLogin/> </Link> </span>
              </div>
              
            </form>
          </div>
        </div>
        </div>
      );
    };

export default Login
