import { UseStore } from "@/zustand/store/store"; // importing from store.tsx

export const Profile = () => {
    const {userInfo} = UseStore() ; // Or states phir  {states.userInfo}
                    //@ts-ignore
    const email = userInfo.email
    return <div>   
      Email : {email} 
    </div>
}