import { UseStore } from "@/zustand/store/store";
import { useRef } from "react";
import { useEffect } from "react";
import moment from 'moment';


export const MessageContainer = () => {
      const ScrollRef = useRef(null)
      const {selectedChatData, selectedChatType, userInfo, selectedChatMessages} = UseStore()
      console.log("Messages:", selectedChatMessages);
      console.log("MessagesType:", selectedChatType);
      console.log("MessageData:", selectedChatData);

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
        <div className={`${message.sender === selectedChatData.id ? "text-left" : "text-right"}`}> 
        {message.messageType === "text" && (
             <div className={`${message.sender !== selectedChatData.id ? "bg-purple-500 text-black border-purple-400" : "bg-black/5 text-white border-white/20" } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
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