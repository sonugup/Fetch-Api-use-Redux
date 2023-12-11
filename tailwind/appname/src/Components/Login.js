import React, { useState } from 'react'
import { FaRegCircleCheck } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from './React-Redux/action';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(loginRequest)

    if (email === "email" && password === "password") {
      dispatch(loginSuccess({ email: "email" }))
    } else {
      dispatch(loginFailure("error"))
    }
  }
  return (
    <div className='w-1/1 min-h-screen m-auto p-3 text-center  bg-slate-100 items-center border-pink-800 '>

      <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 m-50 w-1/1  gap-y-100'>
        <div className='w-1/1 h-1/3  bg-gray-100 p-4 m-3 shadow-sm'>
          <div className='w-1/1 max-h-24 pl-4 m-9' ><img src='https://itaxeasy.com/logo.svg' className='w-1/1 text-center m-auto  max-h-32 shrink-0' /></div>
          <div className=' p-4'>
            <p className='  text-bolt font-medium text-ms m-2 leading-6'>Maximum Tax Saving For You For</p>
            <p className='text-lg font-extrabold text-3xl'>Your Business</p>
          </div>
          <div className='w-2/7 grid w-10/12 m-auto items-center leading-10 border'>
            <p className=' items-center flex gap-7 text-base leading-7 font-sans'>
              <FaRegCircleCheck />
              <span>Reconciliation accurately</span>
            </p>
            <p className=' items-center border flex  gap-7 text-base leading-7 font-sans'>
              <FaRegCircleCheck />
              <span>File your ITR free with us</span>
            </p>
            <p className='text-left border items-center   flex gap-7 max-w-lg text-base leading-7 font-sans'>
              <FaRegCircleCheck className='' />
              <span className=''>On web and App</span>
            </p>
          </div>
        </div>
        <div className='w-1/1 min-h  p-4 m-3'>
          <div className="max-w-md mx-auto mt-10 p-10 bg-white shadow-md rounded-3xl shadow-xl ">
            <h2 className="text-2xl font-bold mt-9"></h2>
            <div className="mb-4 text-left w-50 p-7" >
              <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 text-left px-7">
              <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className='p-2 text-right m-4 text-blue-700 font-sans text-sm font-normal'>Forget Password ?</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-3 w-10/12 rounded focus:outline-none focus:shadow-outline shadow-2xl"
              onClick={handleLogin}
            >
              Password
            </button>
            <p className='text-blue-600/100 p-4'>Don't have an account? Sign up</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login