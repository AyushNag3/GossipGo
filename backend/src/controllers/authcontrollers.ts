import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs"
import { PrismaClient } from '@prisma/client'
const prisma = PrismaClient() ;
export const signup = async(req:Request, res:Response, next:NextFunction) => {
 try {
    const email = req.body.email ; 
    const password = req.body.email ;
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
 }
 catch(error) {
    console.log(error) 
    return res.status(500).send("Internal server error") ;
 }
};