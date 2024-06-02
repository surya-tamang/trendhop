import React, { useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import Home from './pages/Home'
import Men from './pages/Men'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  const [cartList, setCartList] = useState([]);

  const handleCartButton = (product) => {
    setCartList((prevCartList) => [...prevCartList, product])
    console.log('added', product);
    console.log('updated', cartList);
  }


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/fashion-bazar' element={<Home cartList={cartList} />} />
          <Route path='/fashion-bazar/men' element={<Men cartButton={handleCartButton} />} />
          <Route path='/fashion-bazar/log-in' element={<Login />} />
          <Route path='/fashion-bazar/sign-up' element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
