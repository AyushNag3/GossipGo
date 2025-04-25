import express from "express" 
import cors from "cors" 
import cookieParser from "cookie-parser"
import { authRoute } from "./routes/authroutes";
const app = express()  ;
app.use(express.json()) 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser())

app.use('/uploads/profiles', express.static("uploads/profiles"))
app.use('/api/auth', authRoute)
app.get('/', (req,res) => {
    res.send("Hello from")
})
const port = process.env.PORT || 3001 ;
const dburl = process.env.DATABASE_URL ;
 app.listen(port,()=> 
console.log(`Server is listening to port ${port}`)) ;



