import { useState } from 'react'

import './App.css'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from './pages/auth';
import { Chat } from './pages/chat';
import { Profile } from './pages/profile';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
