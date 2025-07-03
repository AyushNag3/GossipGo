import axios from "axios"
import { Host } from "@/utils/constant"

export const Api = axios.create({
    baseURL : Host
})
