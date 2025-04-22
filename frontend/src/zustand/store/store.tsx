import { create } from 'zustand'

interface States {
   userInfo :  React.ReactNode ,
   setUserinfo : (UserInfo :  React.ReactNode ) => void
}

export const UseStore = create<States>((set) => ({
  userInfo: 0,
  setUserinfo : (userInfo) => set({userInfo}) ,
}))