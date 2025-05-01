import { UseStore } from "@/zustand/store/store";
import { useRef } from "react";
import { useEffect } from "react";
import moment from 'moment';
import axios from "axios";
import { Host } from "@/utils/constant";

export const MessageContainer = () => {
      const ScrollRef = useRef(null)
      const {selectedChatData, selectedChatType, userInfo, selectedChatMessages,setSelectedChatMessages} = UseStore()
      console.log("Messages:", selectedChatMessages);
      console.log("MessagesType:", selectedChatType);
      console.log("MessageData:", selectedChatData);

      useEffect( ()=> {
        const getMessages = async() => {
            try {
               const response = await axios.post(`${Host}/api/messages/get-messages`, {id : selectedChatData.id},
                 {withCredentials : true}) ;
                 console.log(`${selectedChatData} || ${selectedChatType}`)
                 if (response.data.messages) {
                    setSelectedChatMessages(response.data.messages)
                 }
            }
            catch (error) {
                console.log(error)
            }
        }
        if (selectedChatData.id) {
            if (selectedChatType === "contact") getMessages()
          }

      }, [])

      useEffect(()=> {
        if (ScrollRef.current) {
            ScrollRef.current.scrollIntoView({behaviour : "smooth"})
        }
      },[selectedChatMessages])

      const renderMessages = () => {
        let lastDate = null ;
        return selectedChatMessages.map((message, index) => {
            const messageData = moment(message.timestamp).format("YYYY-MM-DD") ;
            const showDate = (messageData !== lastDate) ;
            lastDate = messageData ;
            return (
                <div key={index}>
                   {showDate && (
                    <div className="text-center text-gray-500 my-2">
                        {moment(message.timestamp).format("LL")}
                    </div>
                    )}
                    { selectedChatType === "contact" && renderDMmessages(message)}
                </div>
            )
        })
      };

      const renderDMmessages = (message ) => (
        <div className={`${message.senderId === selectedChatData.id ? "text-left" : "text-right"}`}> 
        {message.messageType === "text" && (
             <div className={`${message.senderId !== selectedChatData.id ? "bg-slate-300 text-black border-none" : "bg-slate-800 text-white border-slate-800" } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
               {message.content}
             </div>
        )}
        <div className="text-xs text-gray-600">
            {moment(message.timestamp).format("LT")}
        </div>
        </div>
        
      );

    return (
        <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] b ">
            {renderMessages()}
            <div ref={ScrollRef}></div>
        </div>
    )
}