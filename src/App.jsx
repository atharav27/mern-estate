import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUP from './pages/SignUP'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
  <Header/>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/sign-up' element={<SignUP/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
