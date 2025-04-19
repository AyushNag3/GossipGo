import { UseStore } from "@/zustand/store/store"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";



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