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
  const {userInfo, selectedChatData, selectedChatType, addMessage} = UseStore.getState()  ;
  
  useEffect( () => {
    if (userInfo) {
        socket.current = io(Host, {
            withCredentials: true,
            query : {userId : userInfo.id } ,
        }) ;
        socket.current.on("connect", () => {
            console.log("Connected to socket server")
        })

       const handleReceiveMessage = (message : any) => {
        const { selectedChatData, selectedChatType, addMessage} = UseStore.getState()  ;
          if (selectedChatType !== undefined &&
             (selectedChatData.id === message.sender.id ||
               selectedChatData.id === message.recipient.id)
              )
           {
             console.log("message rcv", message)
             addMessage(message)
          }
       }

        return () => {
         socket.current.disconnect() ;
        }
    }
  }, [userInfo])

  return (
    <SocketContext.Provider value={socket} > 
       {children}
    </SocketContext.Provider>
  )
}