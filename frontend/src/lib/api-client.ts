import axios from "axios"
import { Host } from "@/utils/constant"
import { AUTH_ROUTES } from "@/utils/constant"
import { Signup } from "@/utils/constant"

const api = axios.create({
    baseURL : Host
})
