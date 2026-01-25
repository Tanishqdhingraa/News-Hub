import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 border-b-2 border-blue-600"
      : "text-gray-700 hover:text-blue-600";

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu after click
  };

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 md:px-8 flex items-center justify-between relative">
      {/* Logo */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => handleNav("/")}
      >
        <img
          src="https://img.icons8.com/fluency/48/news.png"
          alt="Logo"
          className="w-10 h-10"
        />
        <h1 className="text-2xl font-bold text-gray-800">NewsHub</h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 text-lg font-medium items-center">
        <button onClick={() => handleNav("/")} className={`${isActive("/")} transition`}>Home</button>
        <button onClick={() => handleNav("/post-news")} className={`${isActive("/post-news")} transition`}>Post News</button>
        <button onClick={() => handleNav("/read-news")} className={`${isActive("/read-news")} transition`}>Read News</button>
        <button onClick={() => handleNav("/ask-ai")} className={`${isActive("/ask-ai")} transition`}>Ask-AI</button>
        <button onClick={() => handleNav("/about")} className={`${isActive("/about")} transition`}>About</button>
      </div>

      {/* Login Button (Desktop) */}
      <button
        onClick={() => handleNav("/login")}
        className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </button>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:hidden z-50">
          <button onClick={() => handleNav("/")} className={isActive("/")}>Home</button>
          <button onClick={() => handleNav("/post-news")} className={isActive("/post-news")}>Post News</button>
          <button onClick={() => handleNav("/read-news")} className={isActive("/read-news")}>Read News</button>
          <button onClick={() => handleNav("/ask-ai")} className={isActive("/ask-ai")}>Ask-AI</button>
          <button onClick={() => handleNav("/about")} className={isActive("/about")}>About</button>
          <button
            onClick={() => handleNav("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
