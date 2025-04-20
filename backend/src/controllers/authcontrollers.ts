import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs"
import { Jwt } from "jsonwebtoken";
let jwt = require('jsonwebtoken');
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient()

const createToken = (email:String,userId: string) => {
  return jwt.sign( {
     data : {
        email, userId
     }
    },
     process.env.JWT_KEY, { expiresIn: 60 * 60 }
  )
}
export const signup = async(req:Request, res:Response, next:NextFunction) => {
 try {
    const email = req.body.email ; 
    const password = req.body.password; 
    const confirmpassword = req.body.confirmpassword ;
    // console.log(`${confirmpassword} and ${password}`)
    if (password !== confirmpassword) {
        return res.status(422).send("Password and Confirm Password does not match")
    }
    if (!email || !password) {
        return res.status(400).send("Email and Password is required") 
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password //
    // @ts-ignore
    const user = await prisma.User.create({
        data : {
            email : email,
            password : hashedPassword
        }
    })
    res.cookie("jwt_cookie", createToken(email, Math.floor(Math.random() * 1000000).toString()), {
        maxAge : 1000*60*60,
        httpOnly: true,         // Keeps it secure from JS
        secure: false,          // true if using HTTPS
        sameSite: "lax"

       })
    return res.status(201).json({
        user : {
            id : user.id,
            email : user.email, 
            password : user.password,
            name : user.Name,
            image : user.image,
            colour : user.color,
            ProfileSetup : user.ProfileSetup
        }
    })
 }
 catch(error) {
    console.log(error) 
    return res.status(500).send("Internal server error") ;
 }
};

export const login = async(req:Request, res:Response, next:NextFunction) => {
 try {
    const email = req.body.email ; 
    const password = req.body.password; 
    // console.log(password)
    const hashPassword = await bcrypt.hash(password, 10); 
    if (!email || !password) {
        return res.status(400).send("Email and Password is required") 
    }      // @ts-ignore
    const user = await prisma.User.findUnique({
        where : {
            email : email
        }
    })
    if (!user) {
      return res.status(404).send('User with the given email not found') ;
    }
    // console.log(user.password)
    const auth = await bcrypt.compare(password,user.password) ;
    if (!auth) {
        return res.status(422).send("Password is Incorrect") ;
    }
   res.cookie("jwt_cookie", createToken(email, Math.floor(Math.random() * 1000000).toString()), {
    maxAge : 1000*60*60,
    httpOnly: true,         // Keeps it secure from JS
    secure: false,          // true if using HTTPS
    sameSite: "lax"
   })
   return res.status(200).json({
     user : {
        id : user.id,
        email : user.email, 
        password : user.password,
        name : user.Name,
        image : user.image,
        colour : user.color,
        ProfileSetup : user.ProfileSetup
     }
   })
 }
 catch(error) {
   console.log(error) 
   return res.status(500).send("Internal Server Error")
 }
}

interface customtype extends Request{
  userId? : string
}

export const getUserInfo = async(req:customtype, res:Response, next:NextFunction) => {
 
  try {
    const email = req.body.email ;
    const password = req.body.password; 
    if (!email || !password) {
        return res.status(400).send("Email and Password is required") 
    }
    const user = await prisma.User.findUnique({
        where : {
            email : email
        }
    })
    if (!user) {
        return res.status(404).send("User with the given email not found")
    }
    const auth = await ;

  }
  catch(error) {

  }
}