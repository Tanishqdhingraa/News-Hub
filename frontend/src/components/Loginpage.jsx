import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <div className="relative w-full h-screen overflow-hidden rounded-4xl mt-16">
      {/* 🔹 Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/3209826/3209826-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* 🔹 Blue Gradient Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-br bg-blue-700 backdrop-blur-sm"></div>

      {/* 🔹 Login Box */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <div className="bg-white/10 backdrop-blur-lg text-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-blue-300/20">
          <h1 className="text-4xl font-extrabold text-center mb-6 text-yellow-400 drop-shadow-lg">
            📰 NewsHub Login
          </h1>
          <p className="text-center text-blue-100 mb-8">
            Welcome back! Sign in to explore, post, and verify news.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-blue-100">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-blue-900/30 border border-blue-400/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-blue-100">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-blue-900/30 border border-blue-400/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg hover:bg-yellow-500 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-blue-100 mt-5">
            Don’t have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-yellow-300 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Login;
