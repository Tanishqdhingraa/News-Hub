import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ To detect the current route

  // Helper function for active link styles
  const isActive = (path) =>
    location.pathname === path
      ? 'text-blue-600 border-b-2 border-blue-600'
      : 'text-gray-700 hover:text-blue-600';

  return (
    <nav className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between">
      {/* Left - Logo */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img
          src="https://img.icons8.com/fluency/48/news.png"
          alt="Logo"
          className="w-10 h-10"
        />
        <h1 className="text-2xl font-bold text-gray-800">NewsHub</h1>
      </div>

      {/* Center - Navigation Links */}
      <div className="hidden md:flex space-x-8 text-lg font-medium items-center">
        <button
          onClick={() => navigate('/')}
          className={`${isActive('/')} transition`}
        >
          Home
        </button>
        <button
          onClick={() => navigate('/post-news')}
          className={`${isActive('/post-news')} transition`}
        >
          Post News
        </button>
        <button
          onClick={() => navigate('/read-news')}
          className={`${isActive('/read-news')} transition`}
        >
          Read News
        </button>
        <button
          onClick={() => navigate('/ask-ai')}
          className={`${isActive('/ask-ai')} transition`}
        >
          Ask-AI
        </button>
        <button
          onClick={() => navigate('/about')}
          className={`${isActive('/about')} transition`}
        >
          About
        </button>
      </div>

      {/* Right - Login Button */}
      <button
        onClick={() => navigate('/login')}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </button>
    </nav>
  );
};

export default Navbar;
