import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs"
import { PrismaClient } from '@prisma/client'
const prisma = PrismaClient() ;
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