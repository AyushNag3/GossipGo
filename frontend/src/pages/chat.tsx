import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseStore } from '@/zustand/store/store';
import { toast } from 'sonner'

export const Chat = () => {
  const { userInfo } = UseStore();
  const navigate = useNavigate();

  useEffect( ()=> {
   if (!userInfo || !userInfo.ProfileSetup) {
     toast.warning("Please Setup a profile to continue")
     navigate("/profile")
   }
}, [userInfo, navigate])

  return (
    <div>
      <h1>Chat Page</h1>
      Name : {userInfo?.FirstName}
    </div>
  );
};
