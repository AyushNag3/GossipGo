import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import Lottie, { useLottie } from "lottie-react";
import animation from "../../../../../../assets/animation.json"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { UseStore } from "@/zustand/store/store"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios";
import { Host } from "@/utils/constant";
import { getColor } from "@/lib/utils";
  
export const NewDm = () => {
   const {setSelectedChatType, setSelectedChatData} = UseStore()
   const [opennewContainerModel, setopennewContainerModel] = useState(false);
   const [SearchContact, setSearchContact] = useState([]) ;
   const searchcontacts = async(searchTerm : any) => {
       try {
           if (searchTerm.length > 0 ) {
            const response = await axios.post(`${Host}/api/contacts/search`, {searchTerm}, {withCredentials : true}) ;
            if (response.status === 200 && response.data.contacts) {
                setSearchContact(response.data.contacts) ;
            }
            else {
                setSearchContact([])
            }
           }
       } 
       catch(error) {
        console.log({error})
       }
   }

   const options = {
    animationData: animation,
    loop : true, 
    autoplay : true
  };



const selectedNewContact = (contact) => {
setopennewContainerModel(false) ;
setSelectedChatType("contact") ;
setSelectedChatData(contact)
setSearchContact([])
}

    return(
        <div>
            <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                 <FaPlus  className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 
                 cursor-pointer transition-all duration-300"  onClick={()=> setopennewContainerModel(true)}/>
                </TooltipTrigger>
                <TooltipContent className="p-1 text-md">
                <p>Select New Contact</p>
                </TooltipContent>
            </Tooltip>
            </TooltipProvider>

            <Dialog open={opennewContainerModel} onOpenChange={setopennewContainerModel}>
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[600px] flex flex-col">
                    <DialogHeader>
                    <DialogTitle>Please select a Contact</DialogTitle>
                    <DialogDescription> 
                    </DialogDescription>
                    </DialogHeader>
                    <div>
                        <input type="text" placeholder="Search Contacts" className="rounded-lg w-full px-6 py-4
                         bg-[#2c2e3b] border-none focus:outline-none"  onChange={(e)=> {searchcontacts(e.target.value)}}/>
                    </div>
                    {SearchContact.length >0 &&  (
                    <ScrollArea className="h-[250px]">
                        <div className="flex flex-col gap-5">
                           {SearchContact.map((contact) => (
                               <div key={contact.id} className="flex gap-3 items-center cursor-pointer" onClick={()=>selectedNewContact(contact)}>

                        <div className="w-12 h-12 relative">
                                <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                                            
                            {contact.image ? ( 
                                        <AvatarImage src={`../../../../../../images/${contact.image}` || ""} alt="profile" className="object-cover w-full h-full bg-black" />
                                    ) : (
                                        <div
                                        className={`uppercase h-12 w-12 rounded-full font-semibold  text-lg flex items-center justify-center ${getColor(contact?.color)}`}
                                        >
                                        {contact?.FirstName ? contact.FirstName[0] : contact.email?.[0] || "A"}
                                        </div>
                                    )}
                                    </Avatar>
                        </div>
                                    <div className="flex flex-col ">
                                    <span>{contact?.FirstName && contact?.LastName ? `${contact.FirstName} ${contact.LastName}` : contact.email}</span>
                                    <span className="text-sm">{contact.email}</span>
                                    </div>
                               </div>                    
                           ))}
                        </div>
                    </ScrollArea>
)}
                   {SearchContact.length <= 0 && (
                   <div>
                   <Lottie  animationData={animation} height={100} width={100} loop={true} autoplay={true}/>
                        <div className="text-opacity-80 text-white flex flex-col gap-5 items-center 
                        lg:text-xl text-lg transition-all duration-300 text-center font-comic">
                            <h3 className="font-extrabold">
                                <span>
                                Hi <span className="text-purple-500">! </span>
                                Search New  
                                <span className="text-purple-500"> Contact </span>
                                </span>
                            </h3>
                        </div>
                     </div>
             ) }
                </DialogContent>
            </Dialog>


        </div>
    )
}