import { RiCloseFill } from "react-icons/ri";

export const ChatHeader = () => {
    return (
        <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
           <div className="flex gap-5 items-center">
            <div className="flex gap-3 items-center justify-center">
               <div className="flex items-center justify-center gap-5 ">
                <button className="text-neutral-500 p-0 focus:border-none focus:outline-none  hover:text-white duration-300 transition-all">
                   <RiCloseFill className="text-2xl hover:outline-1 hover:outline-slate-400 focus:text-neutral-500  duration-300 transition-all"/>
                </button>
               </div>
            </div>
           </div>
        </div>
    )
}