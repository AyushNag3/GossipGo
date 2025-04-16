import { Router } from "express";
import { signup } from "../controllers/authcontrollers";
import { login } from "../controllers/authcontrollers";
export const authRoute = Router() ; //@ts-ignore
authRoute.post('/api/auth/signup', signup)  //@ts-ignore
authRoute.post('/PI/auth/login', login)

