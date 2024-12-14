import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CanSmile
        </Link>
        <div>
        <Link to="/" className="text-gray-800 hover:text-blue-600 mr-4">
            Home
          </Link>
        <Link to="/HowItWorks" className="text-gray-800 hover:text-blue-600 mr-4">
            How It Works
          </Link>
          <Link to="/FAQ" className="text-gray-800 hover:text-blue-600 mr-4">
            FAQ
          </Link>
          
          <Link to="/login" className="text-gray-800 hover:text-blue-600 mr-4">
            Login
          </Link>
          <Link to="/register" className="text-gray-800 hover:text-blue-600">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
