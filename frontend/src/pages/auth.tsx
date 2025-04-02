import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export const Auth = () => {
    return <>
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
       <div className="h-[80vh]  bg-white border-2 border-white shadow-lg opacity-75 w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[80vw] 
       rounded-3xl grid">
          <div className="flex flex-row  justify-center">
             
                 <div className="flex flex-col justify-center w-full">
                   <h1 className="text-5xl font-bold md:text-6xl ">
                        Welcome
                   </h1>
                   <p>Fill the details below to get started </p>
                   <div className="flex justify-center w-full">
                   <Tabs defaultValue="Login" className="w-1/2">
                <TabsList className="bg-transparent rounded-none w-full border-b">
                    <TabsTrigger
                    value="Login"
                    className="data-[state=active]:text-purple-500 data-[state=active]:bg-transparent text-black opacity-90 border-b-2 
                    rounded-none w-full p-1 data-[state=active]:font-semibold data-[state=active]:border-b-purple-500  relative bottom-[-1px] transition-all duration-300"
                    >
                    Login
                    </TabsTrigger>
                    <TabsTrigger
                    value="Signup"
                    className="data-[state=active]:text-purple-500 data-[state=active]:bg-transparent text-black opacity-90 border-b-2 
                    rounded-none w-full p-1 data-[state=active]:font-semibold data-[state=active]:border-b-purple-500  relative bottom-[-1px] transition-all duration-300"
                    >
                    Signup
                    </TabsTrigger>
                </TabsList>
                </Tabs>
                    </div>

                 </div>

             </div>
          
       </div>
    </div>
    </>
}