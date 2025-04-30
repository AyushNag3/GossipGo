import { useEffect, useRef, useState } from "react"
import { CgAttachment } from "react-icons/cg";
import { RiEmojiStickerFill } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import { Theme } from "emoji-picker-react";
import { useSocket } from "@/Context/SocketContext";
import { UseStore } from "@/zustand/store/store";


export const MessageBar = () => {
    const [message, setmessage] = useState("")
    const emojiref = useRef("")
    const [emojipick, setemojipick ]  = useState(false) 
    const socketRef = useSocket();
    const socket = socketRef?.current;
    const {selectedChatType, selectedChatData, userInfo} = UseStore()

    useEffect( () => {
        function handleclickoutside(event) {
            if (emojiref.current && !emojiref.current.contains(event.target)) {
                setemojipick(false) 
            }
        }
        document.addEventListener("mousedown", handleclickoutside) ;
        return () => {
            document.removeEventListener("mousedown", handleclickoutside)
        }
    }, [emojiref])

    const handleAddEmoji = (emoji : {emoji : React.ReactNode | null }) => {
        setmessage((msg) => msg+emoji.emoji)
    }    
    const {LIGHT,DARK,AUTO} = Theme ;

    const handlesendmsg = async() => {

        if (!socket || !message.trim()) {
            console.log(socket)
            console.error("Socket not connected or message is empty")
            return
          }
         if (selectedChatType === "contact") {
            socket.emit("sendMessage" , {
            sender : userInfo.id ,
            content : message ,
            recipient : selectedChatData.id,
            messageType : "text",
            fileUrl : undefined
         })
         setmessage("")
        }
    }

    return (
        <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
            <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5 ">
               <input type="text" className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
               placeholder="Enter Message" 
               value = {message}
               onChange={(e) => {setmessage(e.target.value)}} />
               <button className="p-0">
                <CgAttachment className="text-2xl text-neutral-400 hover:text-white"/>
               </button>
               <div className="relative">
               <button className="text-neutral-500 hover:text-white "
                onClick={() => emojipick === true ? setemojipick(false) : setemojipick(true)}>
                   <RiEmojiStickerFill className="text-2xl"/>
                </button> 
                <div className="absolute bottom-16 right-0" ref={emojiref}>
                    <EmojiPicker theme={LIGHT} open={emojipick} onEmojiClick={handleAddEmoji} />
                </div>
               </div>
            </div>
            <button className="text-neutral-500 hover:text-white p-0" 
              onClick={handlesendmsg}>
              <IoIosSend className="text-3xl"/>
            </button>
         
        </div>
    )
}