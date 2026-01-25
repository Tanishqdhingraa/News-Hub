import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import MovingBanner from '../components/MovingBanner'
import Ban2 from '../components/Ban2'

import Hero from '../components/hero'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'

const Home = () => {
  return (
    <div>
      <Chatbot/>
      <Navbar/>
      <Hero/>
      <Ban2/>
      <Banner/>
      
      <MovingBanner/>
      <Footer/>
      
    </div>
  )
}

export default Home
