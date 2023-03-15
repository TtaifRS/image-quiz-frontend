import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Image from './pages/Image'
import Images from './pages/Images'
import Login from './pages/Login'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import Signup from './pages/Signup'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Images />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/image/:id' element={<Image />} />
      <Route path='/quiz/:id' element={<Quiz />} />
      <Route path='/result' element={<Results />} />
    </Routes>
  )
}

export default App