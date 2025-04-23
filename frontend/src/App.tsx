import { useEffect, useState } from 'react'

import './App.css'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth } from './pages/auth';
import { Chat } from './pages/chat';
import { Profile } from './pages/profile';
import { UseStore } from './zustand/store/store';
import axios from 'axios';
import { Host } from "@/utils/constant"
import { get_user_info } from '@/utils/constant';

const PrivateRoute = ({children} : {children : React.ReactNode}) => {
  const {userInfo} = UseStore() ; //@ts-ignore
  console.log(userInfo.email)
  if (userInfo) return children 
  else return <Navigate to={"/auth"} />
}

const AuthRoute = ({children} : {children : React.ReactNode}) => {
  const {userInfo} = UseStore() ;
  //@ts-ignore
  console.log(userInfo.email)
  if (userInfo) return <Navigate to={"/profile"} />
  else return children
}

function App() {
 const {userInfo, setUserinfo} = UseStore() ;
 const [loading, setloading] = useState(true) ;

 useEffect( () => {
 const getuserdata = async() => {
  try {
    const response = await axios.get(`${Host}/${get_user_info}`,  {withCredentials: true} )
    // console.log(response)
  }
  catch(error) {
    console.log(error)
  }
 }
 if (userInfo) {
  getuserdata() ;
 }
 else {
  setloading(false)
 }
 },[userInfo, setUserinfo])

 if (userInfo) {
  <Navigate to={"/profile"} />
 }

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
