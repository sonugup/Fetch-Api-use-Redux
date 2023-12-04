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
      <div className="container mx-auto border bg-blue-100 m-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className=' w-10/12   gap-x-80 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  m-auto '>
          <div className="mt-4  w-96 m-auto" >
            <label htmlFor="mySelect" className="block text-sm font-medium text-gray-700">
              {/* Select an Option: */}
            </label>
            <select
              id="mySelect"
              name="mySelect"
              className="mt-1 block w-full py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="option1">Today</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          {/* <div className=' mt-4 flex gap-5  w-96 items-center  m-auto'> */}


          <div className="mt-4 w-96 flex gap-4  items-center m-auto">
            <label htmlFor="mySelect" className="block text-sm font-medium text-gray-700">
              <MdCalendarToday />
              {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeP6yFfPwCEiawAI_GuX4xLgiAzbZ3he7LiA&usqp=CAU' className='w-6 h-6' /> */}
            </label>
            <select
              id="mySelect"
              name="mySelect"
              className="mt-1 block w-full py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

            // className="mt-1 block w-full py-2  px-40 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="option1">1/12/2023</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          {/* </div> */}
          {/* <div className='flex gap-5 items-center pl-4 w-96  m-auto'> */}

          <div className=" mt-4 w-96 flex gap-4  m-auto items-center">
            <label htmlFor="mySelect" className="block text-sm font-medium text-gray-700">
              <p>To</p>
            </label>
            <select
              id="mySelect"
              name="mySelect"
              className="mt-1 block w-full py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

            // className="mt-1 block w-full py-2 px-40  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="option1">31/12/2023</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          {/* </div> */}

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 m-10 p-5">
          {/* Add cards or widgets for your dashboard */}
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
          {/* Add more cards as needed */}
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