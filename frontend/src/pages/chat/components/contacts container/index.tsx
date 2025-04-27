import { GiMagicHat } from "react-icons/gi";
import { ProfileInfo } from "./components/profile info";

export const ContactsContainer = () => {
    return (
     <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-black border-r-2 border-[#2f303b] w-full">
        <div className="pt-3">
            <Logo/>
        </div>
         <div className="my-5">
          <div className="flex items-center justify-center pr-10">
            <Title text={"Direct Messages"}/>
          </div>
         </div>
        <div className="my-5">
           <div className="flex items-center justify-center pr-10 ">
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
            <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">{text}</h6>
        )
     }

      export default Logo;
 