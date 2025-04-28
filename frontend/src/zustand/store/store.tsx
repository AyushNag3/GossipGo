import { create } from "zustand";
import { persist } from "zustand/middleware";


interface UserInfo {
  id: number;
  email: string;
  password: string;
  FirstName: string;
  LastName: string;
  image: string;
  color: number;
  ProfileSetup: boolean;
}

// 👇 Add chat states
interface ChatStates {
  selectedChatType: string | undefined;
  selectedChatData: any; 
  selectedChatMessages: any[];
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: any) => void;
  setSelectedChatMessages: (selectedChatMessages: any[]) => void;
  closeChat: () => void;
}

// Combine both
interface States extends ChatStates {
  userInfo: UserInfo | null;
  setUserinfo: (userInfo: UserInfo | null) => void;
}



// Your chat slice
export const createChatSlice = (set: any, get: any) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  setSelectedChatType: (selectedChatType: string | undefined) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData: any) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages: any[]) => set({ selectedChatMessages }),
  closeChat: () => set({
    selectedChatData: undefined,
    selectedChatType: undefined,
    selectedChatMessages: [],
  }),
});

// Final zustand store
export const UseStore = create<States>()(
  persist(
    (set, get) => ({
      userInfo: null,
      setUserinfo: (userInfo) => set({ userInfo }),
      ...createChatSlice(set, get),  // <-- ✅ add this
    }),
    {
      name: "user-info", // localStorage key
      partialize: (state) => ({
        userInfo: state.userInfo,
        // Optional: If you don't want to persist chat slice
      }),
    }
  )
);
