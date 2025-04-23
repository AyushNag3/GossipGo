import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface States {
   userInfo :  React.ReactNode | null ,
   setUserinfo : (UserInfo :  React.ReactNode ) => void
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