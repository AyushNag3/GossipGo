import { UseStore } from "@/zustand/store/store"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import { Request, Response, NextFunction } from "express";

const verifytokenNotAmiddleware = async(req:Request, res:Response) => {
  if (req.cookies.jwt_cookie) {
   return true ;
  } 
  else return false ;
 
 }

export const Chat = () => {
    const {userInfo } = UseStore() ;
    const navigate = useNavigate() //@ts-ignore
    const email = userInfo.email
    useEffect( ()=> {  //@ts-ignore
       if (!userInfo.ProfileSetup) {
         toast.warning("Please Setup a profile to continue")
         navigate("/profile")
       }
    }, [userInfo, navigate])
    return <div>
        Chat : {}
    </div>
}