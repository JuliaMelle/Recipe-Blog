// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">YourAppName</div>
        <div>
          <Link to="/signup" className="text-white hover:text-gray-300">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
