import { UseStore } from "@/zustand/store/store"; // importing from store.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"


export const Profile = () => {
    const {userInfo, setUserinfo} = UseStore() ; // Or states phir  {states.userInfo}
    const navigate = useNavigate();
    const [firstname , setfirstname ] = useState("") ;
    const [lastname , setlastname ] = useState("") ;
    const [image, setimage] = useState(null) ;
    const [hovered, sethovered] = useState(false) ;
    const [selectedcolor, setselectedcolor] = useState(0) ;
                    //@ts-ignore
   const email  = userInfo.email ;
      // use email here
     const savechanges = async() => {

     }
    return (
      <>
      <div className="bg-slate-700 h-[100vh] flex items-center justify-center flex-col gap-10">
        { email}
        <div className="flex flex-col gap-10 w-[80vw] md:w-max">
          <div>
            <IoArrowBack className="text-4xl lg:text-6xl text-white cursor-pointer"></IoArrowBack>
          </div>
          <div className="grid grid-cols-2">
            <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
             onMouseEnter={() => sethovered(true)}   
             onMouseLeave={() => sethovered(false)}
             >
             <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden"> {
              image ? 
            <AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black" /> : (
             <div className="uppercase h-32 w-32 rounded-full font-semibold md:h-48 md:w-48 text-5xl text-white border-black flex items-center justify-center ">                                        
              {firstname ? firstname.split("").shift() : email.split("").shift()  }
             </div>
              )}
            </Avatar>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}