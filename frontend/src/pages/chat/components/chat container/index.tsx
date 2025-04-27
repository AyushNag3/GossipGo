import { ChatHeader } from "./Chat Header"
import { MessageBar } from "./Message Bar"
import { MessageContainer } from "./Message Container"

export const ChatContainer = () => {
   return (
    <div className="fixed top-0 h-[100vh] w-[100vh] bg-black flex flex-col md:static md:flex-1">
        <ChatHeader/>
        <MessageContainer/>
        <MessageBar/>
    </div>
   )
}