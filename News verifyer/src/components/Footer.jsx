import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-10 mt-20">
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

        {/* Middle - Navigation Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li className="hover:text-yellow-300 cursor-pointer transition">Home</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Post News</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Read News</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Ask AI</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">About</li>
          </ul>
        </div>

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
