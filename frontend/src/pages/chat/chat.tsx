import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseStore } from '@/zustand/store/store';
import { toast } from 'sonner'
import { ContactsContainer } from './components/contacts container';
import { EmptyChatContainer } from './components/empty-chat container';
import { ChatContainer } from './components/chat container';

export const Chat = () => {
  const { userInfo, selectedChatType } = UseStore();
  const navigate = useNavigate();

  useEffect( ()=> {
   if (!userInfo || !userInfo.ProfileSetup) {
     toast.warning("Please Setup a profile to continue")
     navigate("/profile")
   }
}, [userInfo, navigate])

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer></ContactsContainer>
      {selectedChatType === undefined ? (<EmptyChatContainer/>) :(
      <ChatContainer/>
    )}
      
    </div>
  );
};
