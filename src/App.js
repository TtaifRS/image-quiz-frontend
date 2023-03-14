import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Image from './pages/Image'
import Images from './pages/Images'
import Login from './pages/Login'
import Signup from './pages/Signup'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Images />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/image/:id' element={<Image />} />
    </Routes>
  )
}

export default App