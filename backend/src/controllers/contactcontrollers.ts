import { PrismaClient } from "../../generated/prisma"
const prisma = new PrismaClient()
import type { Request, Response, NextFunction } from "express"

export const SearchContact = async (req:Request, res: Response, next : NextFunction) => {
    try {
       const searchterm = req.body.searchTerm ;
        if (searchterm === undefined || searchterm === null) {
           return res.status(400).send("SearchTerm is required. ")
        }
            const contacts = await prisma.user.findMany({
                where: {
                  AND: [
                    {
                      id: {      //@ts-ignore
                        not: req.userId,
                      },
                    },
                    {
                      OR: [
                        { FirstName: { contains: searchterm, mode: "insensitive" } },
                        { LastName: { contains: searchterm, mode: "insensitive" } },
                        { email: { contains: searchterm, mode: "insensitive" } },
                      ],
                    },
                  ],
                },
              });
              
              return res.status(200).json({
                contacts
              })
    } catch(error) {
     console.log({error}) 
     return res.status(500).send("Internal Server Error")
    }
   }