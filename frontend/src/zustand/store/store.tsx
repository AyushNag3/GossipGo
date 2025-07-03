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
  directMessagesContacts : any[] ;
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: any) => void;
  setSelectedChatMessages: (selectedChatMessages: any[]) => void;
  setDirectedMessagesContacts : (directMessagesContacts : any[]) => void
  closeChat: () => void;
  addMessage: (message: any) => void; 
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
  directMessagesContacts : [],
  setSelectedChatType: (selectedChatType: string | undefined) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData: any) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages: any[]) => set({ selectedChatMessages }),
  setDirectedMessagesContacts : (directMessagesContacts : any[]) => set({directMessagesContacts}) ,
  closeChat: () => set({
    selectedChatData: undefined,
    selectedChatType: undefined,
    selectedChatMessages: [],
  }),
  addMessage : (message : any) => {
    const selectedChatMessages = get().selectedChatMessages ; 
    const selectedChatType = get().selectedChatType ;
    set({
      selectedChatMessages: [
        ...selectedChatMessages, {
          ...message, 
          recipient : selectedChatType === "channel" ? message.recipient : message.recipient.id,
          sender : selectedChatType === "channel" ? message.sender : message.sender.id
        }
      ]
    })
  }
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
      name: "user-info",
    }
  )
);
