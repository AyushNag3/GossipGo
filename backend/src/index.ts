import express from "express" 
import cors from "cors" 
import cookieParser from "cookie-parser"
const app = express()  ;
app.use(express.json()) 
app.use(cors())
app.use(cookieParser())
const port = process.env.PORT || 3001 ;
const dburl = process.env.DATABASE_URL ;
const  server = app.listen(port,()=> 
console.log(`Server is listening to port ${port}`)) ;



