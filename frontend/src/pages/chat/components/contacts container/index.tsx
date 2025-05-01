import { GiMagicHat } from "react-icons/gi";
import { ProfileInfo } from "./components/profile info";
import { NewDm } from "./components/new-dm";
import { useEffect } from "react";
import axios from "axios"
import { Host } from "@/utils/constant";
import { UseStore } from "@/zustand/store/store";
import { ContactList } from "@/components/contactlist";
export const ContactsContainer = () => {
   const {directMessagesContacts, setDirectedMessagesContacts} = UseStore() 
   useEffect( () => {
       const getContacts = async() => {
          const response = await axios.get(`${Host}/api/contacts/get-contacts-for-dm`, {withCredentials : true})
          console.log(response.data)
          if (response.data.contacts) {
            setDirectedMessagesContacts(response.data.contacts)
          }
       }
       getContacts()
    },[])
    return (
     <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-black border-r-2 border-[#2f303b] w-full">
        <div className="pt-3">
            <Logo/>
        </div>
         <div className="my-5 w-full">
          <div className="flex items-center justify-center ">
            <Title text={"Direct Messages"}/>
            <NewDm />
          </div>
          <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden w-full">
           <ContactList contacts = {directMessagesContacts}  />
         </div>
         </div>
        <div className="my-5">
           <div className="flex ml-12  ">
             <Title text={"Channels"}></Title>
           </div>
        </div>
        <ProfileInfo/> 
     </div>
    )
 }
    const Logo = () => {
        return (
          <div className="flex p-5  justify-start items-center gap-2">
             <GiMagicHat className="text-6xl"/>
            <span className="text-3xl font-semibold ">Gossip Go</span>
          </div>
        );
      };
      
     const Title = ({text} : {text : React.ReactNode}) => {
        return (
            <h6 className="uppercase tracking-widest text-neutral-400 pl-10 mr-14 font-light text-opacity-90 text-sm">{text}</h6>
        )
     }

      export default Logo;
 