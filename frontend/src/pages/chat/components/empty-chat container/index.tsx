
import { useLottie } from "lottie-react";
import animation from "../../../../assets/animation.json"
export const EmptyChatContainer = () => {
    const options = {
        animationData: animation,
        loop : true, 
        autoplay : true
      };
      const { View } = useLottie(options);
    return (
     <div className="flex-1 font-comic md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
         <div style={{ width: "300px", height: "300px" }}>
        {View}
      </div>
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center 
      mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className="font-extrabold">
            <span>
            Hi <span className="text-purple-500">! </span>
            Welcome to 
            <span className="text-purple-500"> Gossip Go </span>
            App
            </span>
        </h3>

     </div>
    </div>
    )
 }