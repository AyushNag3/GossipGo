import express from "express" 
import cors from "cors" 
import cookieParser from "cookie-parser"
import { authRoute } from "./routes/authroutes";
const app = express()  ;
app.use(express.json()) 
app.use(cors({
    origin: "http://localhost:5173", // allow Vite frontend
    credentials: true // allow cookies to be sent if using with auth
  }));
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.get('/', (req,res) => {
    res.send("Hello from")
})
const port = process.env.PORT || 3001 ;
const dburl = process.env.DATABASE_URL ;
 app.listen(port,()=> 
console.log(`Server is listening to port ${port}`)) ;



