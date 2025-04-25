import { Router } from "express";
import { signup, UpdateProfile } from "../controllers/authcontrollers";
import { login } from "../controllers/authcontrollers";
import { verifytoken } from "../middlewares/authmiddlewares";
import { getUserInfo } from "../controllers/authcontrollers";
import { addprofileimage } from "../controllers/authcontrollers";
import { deleteprofileimage } from "../controllers/authcontrollers";

const multer  = require('multer')
const upload = multer({dest: "uploads/profiles/"})
export const authRoute = Router() ; //@ts-ignore
authRoute.post('/signup', signup)  //@ts-ignore
authRoute.post('/login', login)   //@ts-ignore
authRoute.get('/userinfo',verifytoken, getUserInfo) //@ts-ignore
authRoute.post('/profile',verifytoken, UpdateProfile) //@ts-ignore
authRoute.post('/add-profile-img', verifytoken, upload.single("profile-img") ,addprofileimage) //@ts-ignore
authRoute.post('/remove-profile-img', verifytoken, deleteprofileimage)