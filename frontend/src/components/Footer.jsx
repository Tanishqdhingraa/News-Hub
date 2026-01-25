import React from 'react';
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-10 mt-20 rounded-4xl">
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        
        {/* Left - Brand Info */}
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-3xl font-bold">📰 NewsHub</h2>
          <p className="text-gray-200 max-w-sm">
            Your trusted space to <span className="font-semibold">read</span> verified news, 
            <span className="font-semibold"> post</span> stories, and 
            <span className="font-semibold"> ask AI</span> to fact-check information.
          </p>
        </div>
        <ul className="space-y-2 text-gray-200">
          <li><Link to="/" className="hover:text-yellow-300 transition">Home</Link></li>
          <li><Link to="/post-news" className="hover:text-yellow-300 transition">Post News</Link></li>
          <li><Link to="/read-news" className="hover:text-yellow-300 transition">Read News</Link></li>
          <li><Link to="/ask-ai" className="hover:text-yellow-300 transition">Ask AI</Link></li>
          <li><Link to="/about" className="hover:text-yellow-300 transition">About</Link></li>
          <li><Link to="/login" className="hover:text-yellow-300 transition">Login</Link></li>
          <li><Link to="/signup" className="hover:text-yellow-300 transition">Signup</Link></li>
        </ul>


        {/* Right - Social Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-5">
            <a href="#" className="hover:text-yellow-300 transition">
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-blue-500 mt-10 pt-5 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">NewsHub</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
