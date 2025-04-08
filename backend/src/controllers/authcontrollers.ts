import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs"
import { Jwt } from "jsonwebtoken";
import { PrismaClient } from '@prisma/client'
let jwt = require('jsonwebtoken');
const prisma = new PrismaClient() ;
const JWT_SECRET = process.env.JWT_KEY
const createToken = (email:String,userId: number) => {
  jwt.sign( {
     data : {
        email, userId
     }
    },
     JWT_SECRET, { expiresIn: 60 * 60 }
  )
}


export const signup = async(req:Request, res:Response, next:NextFunction) => {
 try {
    const email = req.body.email ; 
    const password = req.body.password
    if (!email || !password) {
        return res.status(400).send("Email and Password is required") 
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const user = await prisma.User.create({
        data : {
            email,
            password : hashedPassword
        }
    })
    return res.status(201).json({
        user : {
            id : user.id,
            email : user.email, 
            password : user.password,
            name : user.Name,
            image : user.image,
            colour : user.color,
            profileSetup : user.profileSetup
        }
    })
 }
 catch(error) {
    console.log(error) 
    return res.status(500).send("Internal server error") ;
 }
};