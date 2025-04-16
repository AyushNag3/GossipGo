import axios from "axios"
import { Host } from "@/utils/constant"
import { AUTH_ROUTES } from "@/utils/constant"
import { Signup } from "@/utils/constant"

export const Api = axios.create({
    baseURL : Host
})
