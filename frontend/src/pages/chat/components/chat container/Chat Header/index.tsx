import { RiCloseFill } from "react-icons/ri";
import { UseStore } from "@/zustand/store/store";
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";

export const ChatHeader = () => {
  const {closeChat, selectedChatData} = UseStore()

    return (
        <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
           <div className="flex gap-5 items-center">
            <div className="flex gap-3 items-center justify-center">
            <div className="w-12 h-12 relative">
               <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                           
            {selectedChatData.image ? ( 
                        <AvatarImage src={`../../../../../images/${selectedChatData.image}` || ""} alt="profile" className="object-cover w-full h-full bg-black" />
                  ) : (
                        <div
                        className={`uppercase h-12 w-12 rounded-full font-semibold  text-lg flex items-center justify-center ${getColor(selectedChatData?.color)}`}
                        >
                        {selectedChatData?.FirstName ? selectedChatData.FirstName[0] : selectedChatData.email?.[0] || "A"}
                        </div>
                  )}
                  </Avatar>
                        </div>
               <div className="flex items-center justify-center gap-5 ">
                <button className="text-neutral-500 p-0 focus:border-none focus:outline-none  hover:text-white duration-300 transition-all"
                onClick={closeChat}>
                   <RiCloseFill className="text-2xl hover:outline-1 hover:outline-slate-400 focus:text-neutral-500  duration-300 transition-all"/>
                </button>
               </div>
            </div>
           </div>
        </div>
    )
}