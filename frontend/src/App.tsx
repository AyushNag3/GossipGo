import { useState } from 'react'

import './App.css'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth } from './pages/auth';
import { Chat } from './pages/chat';
import { Profile } from './pages/profile';
import { UseStore } from './zustand/store/store';

const PrivateRoute = ({children} : {children : React.ReactNode}) => {
  const {userInfo} = UseStore() ;
  const isAuthenticated = !!userInfo ;
  if (isAuthenticated) return children 
  else return <Navigate to={"/auth"} />
}

const AuthRoute = ({children} : {children : React.ReactNode}) => {
  const {userInfo} = UseStore() ;
  const isAuthenticated = !!userInfo ;
  if (isAuthenticated) return  <Navigate to={"/auth"} />
  else return children
}

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to= "/auth" />}/>
        <Route path='/auth' element={<AuthRoute><Auth/></AuthRoute>}></Route>
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
        <Route path='/chat' element={<PrivateRoute><Chat/></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
