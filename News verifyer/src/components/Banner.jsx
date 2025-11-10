import React from 'react'

const Banner = () => {
  return (
    <div className="w-[90%] mx-auto bg-blue-600 shadow-md flex items-center justify-center mt-28 px-10 py-10 rounded-xl">
      {/* Left Section */}
      <div className="max-w-lg">
        <h2 className="text-4xl font-bold text-white mb-4">
          Stay Updated with the Latest News
        </h2>
        <p className="text-white text-lg">
          Connect with us on social media and never miss out on trending news and stories.
          We bring you the latest updates from around the world in one place.
        </p>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-6">
          <img src="https://img.icons8.com/fluency/48/facebook.png" alt="Facebook" className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
          <img src="https://img.icons8.com/fluency/48/twitterx.png" alt="Twitter" className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
          <img src="https://img.icons8.com/fluency/48/instagram-new.png" alt="Instagram" className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
          <img src="https://img.icons8.com/fluency/48/youtube-play.png" alt="YouTube" className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="hidden md:block">
        <img
          src="https://img.freepik.com/free-vector/flat-news-illustration_23-2148885205.jpg"
          alt="News Banner"
          className="w-[400px] rounded-2xl shadow-lg"
        />
      </div>
    </div>
  )
}

export default Banner
