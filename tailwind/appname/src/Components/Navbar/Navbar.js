import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <nav className="bg-gray-200 p-4 text-current">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-current font-bold text-xl">
            <img src='https://itaxeasy.com/logo.svg' className='w-20' />
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-black hover:text-gray-400 text-current">
              Home
            </Link>
            <Link to="/dashboard" className="text-black hover:text-gray-400 text-current">
              Dashboard
            </Link>
            <Link to="/gstpage" className="text-black hover:text-gray-400 text-current">
              GST
            </Link>
            {/* Add more navigation items as needed */}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar