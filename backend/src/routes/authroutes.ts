import { Router } from "express";
import { signup } from "../controllers/authcontrollers";
export const authRoute = Router() ; //@ts-ignore
authRoute.post('/signup', signup)

