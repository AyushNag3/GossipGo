import { UseStore } from "@/zustand/store/store"; // importing from store.tsx

export const Profile = () => {
    const {userInfo} = UseStore() ; // Or states phir  {states.userInfo}
    
    return <div>   
      Email : {userInfo.email} 
    </div>
}