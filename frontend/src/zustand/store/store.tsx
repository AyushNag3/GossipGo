import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserInfo {
  id: number;
  email : string;
  password : string ; 
  FirstName : string ;
  LastName : string
  image : string
  color : number
  ProfileSetup  : boolean 
}

interface States {
  userInfo: UserInfo | null;
  setUserinfo: (userInfo: UserInfo | null) => void;
}
export const UseStore = create<States>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserinfo: (userInfo) => set({ userInfo }),
    }),
    {
      name: "user-info", // key in localStorage
    }
  )
);