import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="bg-gray-200 border-b border-gray-300 py-2.5 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        <Link to="/" className="font-bold text-xl text-gray-800 tracking-tight hover:text-black">
          DEV@Deakin
        </Link>

        <div className="flex-1 max-w-lg mx-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1 text-sm bg-white border border-gray-400 rounded focus:outline-none"
          />
        </div>


        <div className="flex items-center space-x-6 text-sm font-medium text-gray-700">
          <Link
            to="/post"
            className="hover:text-black transition cursor-pointer"
          >
            Post
          </Link>

          <Link
            to="/login"
            className="bg-white border border-gray-400 px-3 py-1 rounded hover:bg-gray-100 hover:text-black transition"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;