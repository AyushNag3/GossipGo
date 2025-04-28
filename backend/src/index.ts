import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { authRoute } from "./routes/authroutes"
import { ContactRoutes } from "./routes/contactroutes"
import path from "path"
import fs from "fs"
import { setupsocket } from "./socket"

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
)
app.use(cookieParser())


app.use("/api/auth", authRoute)
app.use("/api/contacts", ContactRoutes)
app.get("/", (req, res) => {
  res.send("Hello from")
})

const server = process.env.PORT || 8000 // Make sure this uses the environment variable
app.listen(server, () => console.log(`Server is listening to port ${server}`))

setupsocket(server)
