import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import Lottie, { useLottie } from "lottie-react";
import animation from "../../../../../../assets/animation.json"
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
  
export const NewDm = () => {

   const [opennewContainerModel, setopennewContainerModel] = useState(false);
   const [SearchContact, setSearchContact] = useState([]) ;
   const searchcontacts = async(searchTerm) => {
       try {
           if (searchTerm.length > 0 )
       } 
       catch(error) {

       }
   }

   const options = {
    animationData: animation,
    loop : true, 
    autoplay : true
  };

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
                        <input type="text" placeholder="Search Contacts" className="rounded-lg w-full p-6
                         bg-[#2c2e3b] border-none focus:outline-none"  onChange={(e)=> {searchcontacts(e.target.value)}}/>
                    </div>

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