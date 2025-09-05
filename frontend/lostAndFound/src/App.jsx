import { useState } from 'react'
import LoginButton from './components/login'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <LoginButton />
  )
}

export default App
