import { Jwt } from "jsonwebtoken";
let jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from "express";

export const verifytoken = async(req:Request, res:Response, next:NextFunction) => {
  const token = req.cookies.jwt ;
 if (!token) return res.status(401).send("You are not authenticated.")
 console.log(token) ;
}
