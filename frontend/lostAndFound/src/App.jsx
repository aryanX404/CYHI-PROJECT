import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import LoginButton from './pages/login'
import Home from './components/Home'
import Dashboard from './pages/dashboard'
import LostItem from './pages/lostitem'
import PostItem from './pages/postItem'
import MyClaims from './pages/myClaims'


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />}> 
        
        <Route index element={<Dashboard/>} />

        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="postItem" element={<PostItem/>} />
        <Route path="lostitem" element={<LostItem/>} />
        <Route path="myClaims" element={<MyClaims/>} />

      </Route>
      {/* <Route path="/login" element={<LoginButton />} /> */}
      {/* 404 fallback */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>

    // <Home />
    // <LoginButton />
  )
}

export default App
