import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="w-[90%] mx-auto bg-blue-600 shadow-md flex flex-col items-center justify-center text-center mt-28 px-6 md:px-10 py-16 rounded-xl">
      {/* Website Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
        📰 NewsHub
      </h1>

      {/* Tagline */}
      <p className="text-base md:text-xl max-w-2xl mb-10 text-gray-100">
        A platform where people <span className="font-semibold">read</span> the latest stories, 
        <span className="font-semibold"> post</span> their own news, and 
        <span className="font-semibold"> ask AI</span> to verify what’s true.
      </p>

      {/* Call to Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => navigate('/read-news')}
          className="cursor-pointer bg-white text-blue-700 font-semibold px-4 py-2 md:px-5 md:py-2.5 rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          Read News
        </button>

        <button
          onClick={() => navigate('/post-news')}
          className="cursor-pointer bg-yellow-400 text-gray-900 font-semibold px-4 py-2 md:px-5 md:py-2.5 rounded-lg shadow-md hover:bg-yellow-500 transition"
        >
          Post News
        </button>

        <button
          onClick={() => navigate('/ask-ai')}
          className="cursor-pointer bg-blue-800 text-white font-semibold px-4 py-2 md:px-5 md:py-2.5 rounded-lg shadow-md hover:bg-blue-900 transition"
        >
          Ask AI to Verify
        </button>
      </div>
    </section>
  );
};

export default Hero;
