import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import LoginButton from './pages/login'
import Home from './components/home'
import Dashboard from './pages/dashboard'
import MyItems from './pages/myItems'  
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
        <Route path="myItems" element={<MyItems/>} />
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
