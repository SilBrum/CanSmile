import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProfileClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to access your profile.');
      navigate('/login'); // Redirect to login
    } else {
      navigate('/profile'); // Redirect to profile
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-600">
          CanSmile
        </Link>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-gray-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navbar Links (Desktop View) */}
        <div className="hidden sm:flex space-x-4">
          <Link to="/" className="text-gray-800 hover:text-blue-600">
            Home
          </Link>
          <Link to="/HowItWorks" className="text-gray-800 hover:text-blue-600">
            How It Works
          </Link>
          <Link to="/FAQ" className="text-gray-800 hover:text-blue-600">
            FAQ
          </Link>
          <Link to="/login" className="text-gray-800 hover:text-blue-600">
            Login
          </Link>
          <Link to="/register" className="text-gray-800 hover:text-blue-600">
            Register
          </Link>
          <button
            onClick={handleProfileClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Profile
          </button>
        </div>
      </div>

      {/* Navbar Links (Mobile View) */}
      {isMenuOpen && (
        <div className="sm:hidden absolute left-0 w-full bg-white shadow-md z-10">
          <Link
            to="/"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/HowItWorks"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            How It Works
          </Link>
          <Link
            to="/FAQ"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            FAQ
          </Link>
          <Link
            to="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Register
          </Link>
          <button
            onClick={() => {
              handleProfileClick();
              toggleMenu();
            }}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Profile
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
