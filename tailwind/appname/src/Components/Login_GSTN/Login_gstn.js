// src/components/LoginForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/action';

const Login_gstn = () => {
  const dispatch = useDispatch();
  const [gstn, setGstn] = useState('');

  const handleLogin = () => {
    // Dispatch a login action here with the entered GSTN
    dispatch(login(gstn));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-5">GSTN Login</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gstn">
          GSTN (Goods and Services Tax Number)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="gstn"
          type="text"
          placeholder="Enter your GSTN"
          value={gstn}
          onChange={(e) => setGstn(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login_gstn;
