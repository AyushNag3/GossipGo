import { createContext, useEffect, useRef, useContext } from "react"
import { UseStore } from "@/zustand/store/store";
import { Host } from "@/utils/constant";
import {io} from "socket.io-client"

const SocketContext = createContext(null) ;

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({children}) => {
  const socket = useRef() ;
  const {userInfo} = UseStore()  ;
  
  useEffect( () => {
    if (userInfo) {
        socket.current = io(Host, {
            withCredentials: true,
            query : {userId : userInfo.id } ,
        }) ;
        socket.current.on("connect", () => {
            console.log("Connected to socket server")
        })

        return () => {
         socket.current.disconnect() ;
        }
    }
  }, [userInfo])

  return (
    <SocketContext.Provider value={socket.current} > 
       {children}
    </SocketContext.Provider>
  )
}