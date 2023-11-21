import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [inputData, setInputData] = useState({
    email: "",
    name: "",
    contact: "",
    group: "",
  });

  const {name, email, contact, group} = inputData;
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!name || !email || !contact || !group){
      console.log("please fill the form")
    }
    else{
      axios.post(`http://localhost:8081/api/post`, {
        name, 
        email, 
        contact,
        group
      })
      .then(() => {
        setInputData({name:"", email:"", contact:"", group:""});
      })
      .catch((err) =>console.log(err));

      alert("success")
      navigate("/student");
    }

    
  };

  const hendlechenge =(e) => {
    const {name, value}=e.target;
    setInputData({...inputData, [name]:value});
  }
  return (
    <div className="d-flext w-100 vh-100 justify-content-center align-items-center">
      Add Student
      <div className="w-50 border bg-secondary text-white p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              aria-describedby="emailHelp"
              // onChange={(e) =>
              //   setInputData({ ...inputData, email: e.target.value })
              // }
              onChange={hendlechenge}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={hendlechenge}
              // onChange={(e) =>
              //   setInputData({ ...inputData, name: e.target.value })
              // }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input
              type="number"
              className="form-control"
              name="contact"
              onChange={hendlechenge}
              // onChange={(e) =>
              //   setInputData({ ...inputData, contact: e.target.value })
              // }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Group</label>
            <input
              type="text"
              className="form-control"
              name="group"
              onChange={hendlechenge}
              // onChange={(e) =>
              //   setInputData({ ...inputData, group: e.target.value })
              // }
            />
          </div>
          <button type="submit" className="btn btn-primary btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
