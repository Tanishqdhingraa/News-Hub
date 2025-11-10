import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Postnews from './pages/Postnews'
import Readnews from './pages/Readnews'
import About from './pages/About'
import Askai from './pages/Askai'
import Loginpage from './components/Loginpage'
import Sign from './pages/Sign'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-news" element={<Postnews />} />
        <Route path="/read-news" element={<Readnews />} />
        <Route path="/ask-ai" element={<Askai />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Sign />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
