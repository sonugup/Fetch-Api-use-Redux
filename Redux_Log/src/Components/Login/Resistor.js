import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";
import { useDispatch, useSelector } from "react";
import {FaUserAlt} from "react-icons/fa"
import {MdEmail} from "react-icons/md"
import {RiLockPasswordLine} from "react-icons/ri"
import {FaUserPlus} from "react-icons/fa"
import {CiLogin} from "react-icons/ci"
import { registerInitiate } from "../Redux_react/action";

const Resistor = () => {
  const [state, setState]=useState({
    name:"",
    email:"",
    password:"",

  })
  
  const {isAuth} = useSelector((state) => state.user);

  const dispatch=useDispatch()

  const navigate=useNavigate()
  const {name, email, password} =state;

  const handleSubmit=(event) => {
    event.preventDefault();
    dispatch(registerInitiate(email, password, name))
    setState({email:"", password:"", name:""})
  }
    
  const hendlechenge = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]:value});
  }

  useEffect(() => {
    if(isAuth){
      navigate.push("/home")
    }
  }, [isAuth, navigate])
  // 
    
      return (
        <div className='mainpage'>
        <div className="d-flext w-100 vh-100 justify-content-center align-items-center">
          
          <div className="w-50 shadow-lg h-100 mb-5 bg-secondary  text-dark bg-opacity-50 rounded border  text-white p-5">
            <h1 className="m-2 p-2"><FaUserAlt/> Let Us Know You!</h1>
            <hr/>
            <hr/>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label"> <FaUserPlus/> UserName</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={hendlechenge}
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                    <MdEmail/>
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  aria-describedby="emailHelp"
                  onChange={hendlechenge}
                  placeholder="Enter Email"
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label"><RiLockPasswordLine/> Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={hendlechenge}
                  required
                />
              </div>
              
              <button type="submit" className="btn btn-primary btn-success">
                Sigin
              </button>
              <div className="mt-5 text-center bg-secondary p-3 text-dark bg-opacity-50 rounded text-white">
              <span>Have an account? <Link to="/" className="bg-secondary p-2 text-white bg-opacity-75 rounded border-none text-decoration-none">Sign UP <CiLogin/> </Link> </span>
              </div>
            </form>
          </div>
        </div>
        </div>
      );
    };

export default Resistor
