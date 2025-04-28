import { disconnect } from "process";
import { Server as SocketIoServer } from "socket.io"
export const setupsocket = (server) => {
  const io = new SocketIoServer(server, {
    cors :{
    origin: "http://localhost:5173",
    credentials: true,
    },
})}

const userSocketMap = new Map() ;

const disconnect = (socket) => {
console.log(`Client Disconnected : ${socket.id}`) ;
for (const [userId, socketId] of userSocketMap.entries()) {
    if (socketId === socket.id) {
        userSocketMap.delete(userId) ;
        break ;
    }
}
}

io.on("connection", (socket)=> {
    const userId = socket.handshake.query.userId ;
    console.log(`User connected : ${userId} with socket ID : ${socket.id}`)
    if (userId) {
        userSocketMap.set(userId,socket.id)
    } else {
        console.log("User Id not provided during connection ")
    }

    socket.on("disconnect", () => disconnect(socket))
})