
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import Navbar from './components/Navbar'

export default function App(){
  const token = localStorage.getItem("token")
  return (
    <>
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/checkout" element={token ? <Checkout /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}
