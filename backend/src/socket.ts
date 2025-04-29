import cors from "cors"
import { Server as SocketIoServer } from "socket.io"
import { PrismaClient } from "../generated/prisma"
const prisma = new PrismaClient()
 //@ts-ignore
export const setupsocket = (server) => {
  const io = new SocketIoServer(server, {
    cors :{
    origin: "http://localhost:5173",
    credentials: true,
    },
})

const userSocketMap = new Map() ;
                //@ts-ignore
const disconnect = (socket) => {
console.log(`Client Disconnected : ${socket.id}`) ;
for (const [userId, socketId] of userSocketMap.entries()) {
    if (socketId === socket.id) {
        userSocketMap.delete(userId) ;
        break ;
    }
}
}

const sendMessage = async(message : any) => {
 const senderSocketId = userSocketMap.get(message.sender) ;
 const receipientSocketId = userSocketMap.get(message.recipient) ; //@ts-ignore
 const createMessage = await prisma.Message.create(message)
 const messageData = await prisma.message.findUnique({
    where: {
      id: createMessage.id, // use `id` as it's an Int in Prisma
    },
    include: {
      sender: {
        select: {
          id: true,
          email: true,
          FirstName: true,
          LastName: true,
          image: true,
          color: true,
        },
      },
      recipient: {
        select: {
          id: true,
          email: true,
          FirstName: true,
          LastName: true,
          image: true,
          color: true,
        },
      },
    },
  }); 
  if (receipientSocketId) {
    io.to(receipientSocketId).emit("receiveMessage", messageData) ;
  }
  if (senderSocketId) {
    io.to(senderSocketId).emit("receiveMessage", messageData)
  }
}


  //@ts-ignore
io.on("connection", (socket)=> {
    const userId = socket.handshake.query.userId ; 
    if (userId) {
        userSocketMap.set(userId,socket.id)
        console.log(`User connected : ${userId} with socket ID : ${socket.id}`)
    } else {
        console.log("User Id not provided during connection ")
    }

    socket.on("sendMessage", sendMessage)
    socket.on("disconnect", () => disconnect(socket))
})
}