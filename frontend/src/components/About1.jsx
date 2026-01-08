import React from 'react';

const About1 = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 md:px-20 py-16">
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-center drop-shadow-lg">
        About <span className="text-yellow-300">NewsHub</span>
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl max-w-3xl text-center text-gray-100 mb-10 leading-relaxed">
        Welcome to <span className="font-semibold text-yellow-300">NewsHub</span> — a next-generation 
        platform built for truth seekers, writers, and readers.  
        <br /><br />
        Our goal is simple: to create a space where people can <span className="font-semibold">read verified news</span>, 
        <span className="font-semibold"> post their own stories</span>, and even 
        <span className="font-semibold"> ask AI to cross-check facts</span> — ensuring credibility in every word.  
        <br /><br />
        With modern AI-powered tools and a vibrant community, NewsHub empowers citizens 
        to stay informed, express their voice, and challenge misinformation.
      </p>

      {/* Highlights Section */}
      <div className="grid md:grid-cols-3 gap-6 text-center w-full max-w-4xl">
        <div className="bg-white/10 p-6 rounded-xl shadow-md hover:bg-white/20 transition">
          <h3 className="text-2xl font-semibold text-yellow-300 mb-2">📰 Read</h3>
          <p className="text-gray-100 text-sm">
            Explore the latest verified stories from trusted sources and community journalists.
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-xl shadow-md hover:bg-white/20 transition">
          <h3 className="text-2xl font-semibold text-yellow-300 mb-2">✍️ Post</h3>
          <p className="text-gray-100 text-sm">
            Share your thoughts, local news, or opinions with a growing audience of readers.
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-xl shadow-md hover:bg-white/20 transition">
          <h3 className="text-2xl font-semibold text-yellow-300 mb-2">🤖 Ask AI</h3>
          <p className="text-gray-100 text-sm">
            Verify facts instantly with AI to keep misinformation at bay.
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <p className="text-sm mt-10 text-gray-200 italic">
        “Empowering truth through technology and community.”
      </p>
    </section>
  );
};

export default About1;
