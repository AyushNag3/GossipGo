import { UseStore } from "@/zustand/store/store"; // importing from store.tsx
import { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { colors, getColor } from "@/lib/utils";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Host } from "@/utils/constant";
import { toast } from "sonner";


export const Profile = () => {
    const {userInfo, setUserinfo} = UseStore() ; // Or states phir  {states.userInfo}
    const navigate = useNavigate();
    const [firstname , setfirstname ] = useState("") ;
    const [lastname , setlastname ] = useState("") ;
    const [image, setimage] = useState(null) ;
    const [hovered, sethovered] = useState(false) ;
    const [selectedcolor, setselectedcolor] = useState(0) ;
                    //@ts-ignore
    const email = userInfo.email
      const validateprofile = () => {
        if (!firstname) {
          toast.warning("First Name is required") 
          return false ;
        }
        if (!lastname) {
          toast.warning("Last Name is required") 
          return false ;
        }
        return true ;
      }
     const savechanges = async() => {
      try {
      if (validateprofile()) {
       const response = await axios.post(`${Host}/api/auth/profile`, {firstname,lastname, selectedcolor}, {withCredentials : true})
       if (response.status === 200) {
        toast.success("Profile has been updated successfully")
        setUserinfo(response.data.user)
        navigate('/chat')
       }
      }
    } catch(error) {
      console.log(error) 
    }
     }
    return (
      <>
      <div className="bg-slate-700 h-[100vh] flex items-center justify-center flex-col gap-10">
        
        <div className="flex flex-col gap-10 w-[80vw] md:w-max">
          <div>
            <IoArrowBack className="text-4xl lg:text-6xl text-white cursor-pointer"></IoArrowBack>
          </div>
          <div className="grid grid-cols-2">
            <div className="h-32 w-32 md:w-40 md:h-40 relative flex items-center justify-center"
             onMouseEnter={() => sethovered(true)}   
             onMouseLeave={() => sethovered(false)}
             >
             <Avatar className="h-32 w-32 md:w-40 md:h-40 rounded-full overflow-visible"> {
              image ? 
            <AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black" /> : (
             <div className={`uppercase h-32 w-32 rounded-full font-semibold md:h-40 md:w-40 text-5xl flex items-center justify-center ${getColor(selectedcolor)}`}>                                        
              {firstname ? firstname[0] : email[0] }
            </div> 
              )}
            </Avatar>
            {
              hovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full cursor-pointer">
                  {image ? <FaTrash className="text-white text-3xl"/> : <FaPlus className="text-white text-3xl"/>}
                </div>
              )
            }
            
            </div>
            <div className="flex min-w-32 md:w-64 flex-col gap-5 text-white items-center justify-center">
              <div className="w-full">
                <Input type="email" placeholder="Email" disabled value={email} className="border-none bg-[#2c2e3b] p-6 rounded-lg"></Input>
              </div>
              <div className="w-full">
                <Input type="text" placeholder="First Name" onChange={(e) => setfirstname(e.target.value)} value={firstname} className="border-none bg-[#2c2e3b] p-6 rounded-lg"></Input>
              </div>
              <div className="w-full">
                <Input type="email" placeholder="Last Name" onChange={(e) => setlastname(e.target.value)} value={lastname} className="border-none bg-[#2c2e3b] p-6 rounded-lg"></Input>
              </div>
              <div className="w-full flex gap-5">
                {
                  colors.map((color , index) => (
                  
                    <div key={index} onClick={() => {setselectedcolor(index)}} className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedcolor === index ? "outline outline-white " : ""}`}>
                    </div>
                  
                  ))
                }
              </div>
            </div>
          </div>
          <div className="w-full "> 
            <Button onClick={savechanges} className="h-16 w-full bg-[#077A7D] hover:bg-[#077A7D80] text-2xl" >
               Click Me
            </Button>
          </div>
        </div>
      </div>
      </>
    )
}