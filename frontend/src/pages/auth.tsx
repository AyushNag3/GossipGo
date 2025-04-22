import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {toast} from "sonner"
import axios from "axios"
import { Host } from "@/utils/constant"
import { useNavigate } from "react-router-dom"
import { UseStore } from "@/zustand/store/store"

export const Auth = () => {
   const navigate = useNavigate() ;
    const [email, setemail] = useState("") ;
    const [password, setpassword] = useState("") ;
    const [confirmpassword, setconfirmpassword] = useState("") ;
    const  {setUserinfo} = UseStore() ;

 const validatelogin = () => {
      if (!email.length) {
         toast.warning("Email is required")
         return false
      }
      if (!password.length) {
         toast.warning("Password is required")
         return false
      }
      else return true ;
    }
 

    const validatesignup = () => {
      if (!email.length) {
         toast.warning("Email is required")
         return false
      }
      if (!password.length) {
         toast.warning("Password is required")
         return false
      }
      if (password !== confirmpassword) {
         toast.warning("Password and Confirmed Password should be same.")
         return false
      }
      else return true ;
    }
    const handlelogin = async() => {
      
      if (validatelogin()) {
         const response = await axios.post(`${Host}/api/auth/login`, {email,password}, {withCredentials: true} )
         if (response.data.user.id) {
            setUserinfo(response.data.user)
            if (response.data.user.ProfileSetup) navigate("/chat")
               else navigate("/profile")
         }
         // console.log(response)
         
         toast.success("User is loggged in")
       }
    }
    const handlesignup = async() => {
      
    if (validatesignup()) {
        const response = await axios.post(`${Host}/api/auth/signup`, {email,password,confirmpassword}, {withCredentials: true} )
        if (response.status === 201) {
         setUserinfo(response.data.user)
         navigate("/profile")
        }
        toast.success("User is signed in")
    }
   }
    return <>
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
       <div className="mr h-[80vh]  bg-white border-2 border-white shadow-lg opacity-75 w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] 
       rounded-3xl grid">
          <div className="flex flex-row  justify-center">
             
                 <div className="flex flex-col items-center justify-center w-full">
                   <h1 className="text-5xl font-bold md:text-6xl ">
                        Welcome
                   </h1>
                   <p>Fill the details below to get started </p>
                   <div className="flex justify-center w-full">
                   <Tabs defaultValue="Login" className="w-1/2">
                <TabsList className="bg-transparent rounded-none w-full border-b">
                    <TabsTrigger
                    value="Login"
                    className=" data-[state=active]:bg-transparent text-black opacity-90 border-b-2 border-transparent rounded-none w-full p-1 data-[state=active]:font-semibold data-[state=active]:border-b-purple-500  relative bottom-[-1px] transition-all duration-300"
                    >
                    Login
                    </TabsTrigger>
                    <TabsTrigger
                    value="Signup"
                    className=" data-[state=active]:bg-transparent text-black opacity-90 border-b-2 border-transparent rounded-none w-full p-1 data-[state=active]:font-semibold data-[state=active]:border-b-purple-500  relative bottom-[-1px] transition-all duration-300"
                    >
                    Signup
                    </TabsTrigger>
                </TabsList>
                 <TabsContent value="Login" className="gap-2 mt-10 flex flex-col">
                 <Input type="email" placeholder="Email" className="rounded-full p-6 border-slate-300" onChange={(e)=> {
                          setemail(e.target.value)
                    }} />
                 <Input type="password" placeholder="Password" className="rounded-full p-6 border-slate-300" onChange={(e)=> {
                          setpassword(e.target.value)
                    }} />
                 <Button className="rounded-full p-6 text-slate-100" onClick={handlelogin}>Login</Button>
                 </TabsContent>
                 <TabsContent value="Signup" className="gap-3 mt-10 flex flex-col">
                 <Input type="email" placeholder="Email" className="rounded-full p-6 border-slate-300" onChange={(e)=> {
                          setemail(e.target.value)
                    }} />
                 <Input type="password" placeholder="Password" className="rounded-full p-6 border-slate-300" onChange={(e)=> {
                          setpassword(e.target.value)
                    }} />
                 <Input type="password" placeholder="Confirm Password" className="rounded-full p-6 border-slate-300" onChange={(e)=> {
                          setconfirmpassword(e.target.value)
                    }} />
                  <Button className="rounded-full p-6 text-slate-100" onClick={handlesignup} >Signup</Button>
                 </TabsContent>
                </Tabs>
                    </div>

                 </div>

             </div>
          
       </div>
    </div>
    </>
}