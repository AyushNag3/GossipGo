import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { authRoute } from "./routes/authroutes"
import path from "path"
import fs from "fs"

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
)
app.use(cookieParser())

// Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, "uploads", "profiles")
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true })
// }

// Fix the static file serving path - this is critical
// The URL path needs to match what the frontend is requesting
// app.use("/uploads/profiles", express.static(path.join(__dirname, "uploads", "profiles")))

app.use("/api/auth", authRoute)
app.get("/", (req, res) => {
  res.send("Hello from")
})

const port = process.env.PORT || 8000 // Make sure this uses the environment variable
app.listen(port, () => console.log(`Server is listening to port ${port}`))
