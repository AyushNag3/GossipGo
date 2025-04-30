import { UseStore } from "@/zustand/store/store";
import { useRef } from "react";


export const MessageContainer = () => {
      const ScrollRef = useRef()
      const {selectedChatData, selectedChatType, userInfo, selectedChatMessages} = UseStore()

      const renderMessages = () => {} ;

    return (
        <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] ">
            {renderMessages()}
        </div>
    )
}