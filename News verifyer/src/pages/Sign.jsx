import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Sign() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Signed In:', formData);
    alert('Sign In Successful!');
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
          👋 Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to continue posting and exploring news
        </p>

        {/* Email Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
        >
          Sign In
        </button>

        {/* Footer Links */}
        <div className="text-center text-gray-600 mt-4">
          <p className="text-sm">
            Don’t have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
    </>
    
  );
}

export default Sign;
