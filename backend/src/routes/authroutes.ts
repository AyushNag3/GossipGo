import { Router } from "express";
import { signup, UpdateProfile } from "../controllers/authcontrollers";
import { login } from "../controllers/authcontrollers";
import { verifytoken } from "../middlewares/authmiddlewares";
import { getUserInfo } from "../controllers/authcontrollers";
export const authRoute = Router() ; //@ts-ignore
authRoute.post('/signup', signup)  //@ts-ignore
authRoute.post('/login', login)   //@ts-ignore
authRoute.get('/userinfo',verifytoken, getUserInfo) //@ts-ignore
authRoute.post('/profile',verifytoken, UpdateProfile) 