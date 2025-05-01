import { createContext, useEffect, useRef, useContext } from "react"
import { UseStore } from "@/zustand/store/store";
import { Host } from "@/utils/constant";
import {io} from "socket.io-client"


const SocketContext = createContext(null) ;

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({children}) => {
  const socket = useRef(null) ;
  const {userInfo, selectedChatData, selectedChatType, addMessage} = UseStore.getState()  ;
  
  useEffect(() => {
    // Disconnect the old socket if it exists
    if (socket.current) {
      console.log("Disconnecting old socket...")
      socket.current.disconnect()
      socket.current = null
    }
  
    if (userInfo) {
      console.log("Connecting socket for user:", userInfo.id)
      socket.current = io(Host, {
        withCredentials: true,
        query: { userId: userInfo.id },
      })
  
      socket.current.on("connect", () => {
        console.log("Connected to socket server")
      })
  
      const handleReceiveMessage = (message: any) => {
        const { selectedChatData, selectedChatType, addMessage } = UseStore.getState()
        if (
          selectedChatType !== undefined &&
          (selectedChatData?.id === message.sender?.id ||
            selectedChatData?.id === message.recipient?.id)
        ) {
          addMessage(message)
        }
      }
  
      socket.current.on("receiveMessage", handleReceiveMessage)
    }
  
    return () => {
      if (socket.current) {
        console.log("Cleanup: Disconnecting socket...")
        socket.current.disconnect()
        socket.current = null
      }
    }
  }, [userInfo])
  

  return (
    <SocketContext.Provider value={socket} > 
       {children}
    </SocketContext.Provider>
  )
}