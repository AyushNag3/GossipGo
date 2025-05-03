import { UseStore } from "@/zustand/store/store"
import { Avatar,AvatarFallback,AvatarImage } from "./ui/avatar"
import { getColor } from "@/lib/utils"
import axios from "axios"
import { Host } from "@/utils/constant"


export const ContactList = ({contacts , isChannel = false}) => {
    const { setSelectedChatData, setSelectedChatType,setSelectedChatMessages, selectedChatData} = UseStore()
    const handleClick = async(contact) => {
     //  console.log(contact)
     if (isChannel) setSelectedChatType("channel")
        else setSelectedChatType("contact")
    
        setSelectedChatData(contact)
        console.log(selectedChatData) // Log the contact data 
    }
    return <>
        <div className="mt-5 ">{ contacts.map((contact) => 
            <div className="pl-10 py-2 cursor-pointer hover:bg-slate-700" key={contact.id}  onClick={() => 
            handleClick(contact)}> 
              <div className="flex gap-5 items-center justify-start text-neutral-300"> 
                {
                    !isChannel &&  (
                       <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                                               
                        {contact.image ? ( 
                                    <AvatarImage src={`../../../../../images/${contact.image}` || ""} alt="profile" className="object-cover w-full h-full bg-black" />
                                ) : (
                                    <div
                                    className={`uppercase h-12 w-12 rounded-full font-semibold  text-lg flex items-center justify-center ${getColor(contact?.color)}`}
                                    >
                                    {contact?.FirstName ? contact.FirstName[0] : contact.email?.[0] || "A"}
                                    </div>
                                )}
                        </Avatar>
                )}
                    {
                        isChannel && (
                            <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">#</div>
                    )}

                    {
                        isChannel ? (<span>{contact.name}</span>) : (
                            <span>{`${contact.FirstName} ${contact.LastName}`}</span>
                        )
                    }
                    
              </div>
             </div>)  }</div>
   </>
}