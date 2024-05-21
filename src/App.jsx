import React from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import Home from './pages/Home'
import Men from './pages/Men'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/fashion-bazar' element={<Home />} />
          <Route path='/men' element={<Men />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
