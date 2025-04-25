import { useEffect, useState } from 'react'
import { Request, Response, NextFunction } from "express";
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

// const verifytokenNotAmiddleware = async(req:Request, res:Response) => {
//   if (req.cookies.jwt_cookie) {
//    return true ;
//   } 
//   else return false ;
//  }
 
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { userInfo, setUserinfo } = UseStore();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(`${Host}/${get_user_info}`, {
          withCredentials: true,
        });
        if (response.data) {
          setUserinfo(response.data);
          setVerified(true);
        } else {
          setUserinfo(null);
          setVerified(false);
        }
      } catch (error) {
        console.error("User verification failed:", error);
        setUserinfo(null);
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [setUserinfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (verified) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth" />;
  }
};


// const AuthRoute = ({children} : {children : React.ReactNode}) => {
//   const {userInfo} = UseStore() ; //@ts-ignore
//   if (verifytokenNotAmiddleware())  return children
  
//   else return <Navigate to={"auth"} />
// }

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
 else <Navigate to = {"/auth"} />

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to= "/auth" />}/>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
        <Route path='/chat' element={<PrivateRoute><Chat/></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
