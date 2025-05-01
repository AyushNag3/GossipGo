import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { UseStore } from "@/zustand/store/store"
import { getColor } from "@/lib/utils"
import { Tooltip, TooltipContent,TooltipProvider,TooltipTrigger } from "@/components/ui/tooltip"
import { FaEdit } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { IoLogOutOutline } from "react-icons/io5";
import { Host } from "@/utils/constant"
import axios from "axios"


export const ProfileInfo = () => {
    const navigate = useNavigate()
    const {userInfo, setUserinfo} = UseStore()

    const Logout = async() => {
       try {
        const response = await axios.post(`${Host}/api/auth/logout`,{}, {withCredentials : true} )
        console.log(response)
        if (response.status === 200) {
            navigate('/auth') ; setUserinfo(null)
            window.location.reload() 
        }
       } catch(error) {
        console.log(error)
       }
    }

    return(
        <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
            <div className="flex gap-3 items-center justify-center">
                <div className="w-12 h-12 relative">
                <Avatar className="h-12 w-12  rounded-full overflow-hidden">
               
               {userInfo.image ? ( 
                 <AvatarImage src={`../../../../../../images/${userInfo.image}` || ""} alt="profile" className="object-cover w-full h-full bg-black" />
               ) : (
                 <div
                   className={`uppercase h-12 w-12 rounded-full font-semibold  text-lg flex items-center justify-center ${getColor(userInfo?.color)}`}
                 >
                   {userInfo?.FirstName ? userInfo.FirstName[0] : userInfo.email?.[0] || "A"}
                 </div>
               )}
             </Avatar>
              </div>
              {
                userInfo?.FirstName && userInfo.LastName ? `${userInfo.FirstName} ${userInfo.LastName} ` : " "
              }
             </div>
             <div className="flex gap-5 ">
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaEdit className="text-purple-500 text-xl font-medium" onClick={()=> {navigate("/profile")}} />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                    Edit Profile
                    </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <IoLogOutOutline className="text-purple-500 text-xl font-medium" onClick={Logout} />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                    Logout
                    </TooltipContent>
                </Tooltip>
              </TooltipProvider>

             </div>
        </div>
    )
}