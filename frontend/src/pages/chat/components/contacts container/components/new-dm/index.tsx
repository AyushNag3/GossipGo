import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { ScrollArea } from "@/components/ui/scroll-area"

  
export const NewDm = () => {

   const [opennewContainerModel, setopennewContainerModel] = useState(false)

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
                
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                    <DialogHeader>
                    <DialogTitle>Please select a Contact</DialogTitle>
                    <DialogDescription>
                       
                    </DialogDescription>
                    </DialogHeader>
                    <div>
                        <input type="text" placeholder="Search Contacts" className="rounded-lg w-full p-6 bg-[#2c2e3b] border-none"/>
                    </div>
                </DialogContent>
            </Dialog>


        </div>
    )
}