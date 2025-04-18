import { UseStore } from "@/zustand/store/store"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const {userInfo } = UseStore() ;

export const Chat = () => {
    return <div>
        Chat : {userInfo.email}
    </div>
}