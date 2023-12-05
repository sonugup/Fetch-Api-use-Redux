import React from 'react'
import { PiUserCircleFill } from "react-icons/pi";
import { LiaSalesforce } from "react-icons/lia";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdCalendarToday } from "react-icons/md";
import LineChart from './Dash_chart';
import LineChart2 from './Dash_chart2';

const Dashboard = () => {
  return (
    <div>
      <div className="container mx-auto border bg-blue-100 h-full">
        <div className=' w-full  md:w-11/12 lg:w-11/12 xl:w-11/12  lg:gap-60  xl:gap-x-80 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border  m-auto text-center '>
          <div className="mt-4 mr-7 sm:w-11/12 px-0 w-10/12 md:w-72 md:mr-4 lg:w-72 m-auto" >
            <label htmlFor="mySelect" className="block text-sm font-medium text-gray-700">
            </label>
            <select
              id="mySelect"
              name="mySelect"
              className="mt-1 block w-full py-2  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="option1">Today</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>



          <div className="mt-4  ml-6 p-2 w-11/12 md:w-80 lg:w-72  flex gap-4  items-center m-auto">
            <label htmlFor="mySelect" className="block text-sm font-medium text-gray-700">
              <MdCalendarToday />
            </label>
            <select
              id="mySelect"
              name="mySelect"
              className="mt-1 block w-full py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="option1">1/12/2023</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          <div className=" mt-4 ml-6 p-2 w-11/12 ml-5 md:w-80 lg:w-80 flex gap-4   m-auto items-center">
            <label htmlFor="mySelect" className="block text-sm font-medium text-gray-700">
              <p>To</p>
            </label>
            <select
              id="mySelect"
              name="mySelect"
              className="mt-1 block w-full py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="option1">31/12/2023</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 m-10 p-5">
          <div className="bg-white p-4 rounded-3xl shadow-xl text-gray-400 font-bold">
            <h3 className="text-2xl font-semibold mb-2">TOTAL USER</h3>
            <h1 className='text-slate-700 text-3xl font-extrabold flex justify-between'>
              {"3520"}
              <div className='bg-blue-400 w-20 h-20  rounded-full border-slate-300 border-4 shadow-2xl '>
                <PiUserCircleFill className='text-blue-500 w-1/1 text-xl bg-gray-100 rounded-3xl  w-12 h-12 m-3 ' />
              </div>
            </h1>
            <p><span className='text-green-500 font-bold'>{"+10%"}</span> Since</p>
            <p>Yesterday</p>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-xl text-gray-400 font-bold">
            <h3 className="text-2xl font-semibold mb-2">NEW   CLIENTS</h3>
            <h1 className='text-slate-700 text-3xl font-extrabold flex justify-between'>
              {"350"}
              <div className='bg-green-400 font-bold w-20 h-20  rounded-full border-slate-300 border-4 shadow-2xl '>
                <PiUserCircleFill className='text-green-500 w-1/1 text-xl bg-gray-100 rounded-3xl  w-12 h-12 m-3 ' />
              </div>
            </h1>
            <p><span className='text-red-500 font-bold'>{"-2%"}</span> since last</p>
            <p>quarter</p>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-xl text-gray-400 font-bold">
            <h3 className="text-2xl font-semibold mb-2">SALES</h3>
            <h1 className='text-slate-700 text-3xl font-extrabold flex justify-between'>
              {"₹103,403"}
              <div className='bg-lime-400 fill-green-600 w-20 h-20  rounded-full border-slate-300 border-4 shadow-2xl '>
                <LiaSalesforce className='text-green-500 w-1/1 text-xl bg-gray-100 rounded-3xl  w-12 h-12 m-3 ' />
              </div>
            </h1>
            <p><span className=' font-bold text-green-500'>{"+20%"}</span> since</p>
            <p>last month</p>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-xl text-gray-400 font-bold">
            <h3 className="text-2xl font-semibold mb-2">Today'a Visiters</h3>
            <h1 className='text-slate-700 text-3xl font-extrabold flex justify-between'>
              {"106"}
              <div className='bg-red-400 w-20 h-20  rounded-full border-slate-300 border-4 shadow-2xl '>
                <MdOutlineLocationOn className='text-green-500 w-1/1 text-xl bg-gray-100 rounded-3xl  w-12 h-12 m-3 ' />
              </div>
            </h1>
            <p><span className='text-green-500 font-bold'>{"+2%"}</span> since last</p>
            <p>day</p>
          </div>
        </div>

        <div className='w-11/12 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
          <div className='w-1/1 font-sans text-center h-100 rounded-3xl shadow-2xl border '>
            <LineChart />
          </div>
          <div className='w-1/1 font-sans text-center h-100 rounded-3xl shadow-2xl'>
            <LineChart2 />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard