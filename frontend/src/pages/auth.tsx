import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export const Auth = () => {
    return <>
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
       <div className="h-[80vh]  bg-white border-2 border-white shadow-lg opacity-75 w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[80vw] 
       rounded-3xl grid">
          <div className="flex flex-row  justify-center">
             
                 <div className="flex flex-col justify-center">
                   <h1 className="text-5xl font-bold md:text-6xl ">
                        Welcome
                   </h1>
                   <p>Fill the details below to get started </p>
                   
                    <div className="w-full">
                    <Tabs defaultValue="Login" className="w-72">
                    <TabsList>
                        <TabsTrigger value="Login">Login</TabsTrigger>
                        <TabsTrigger value="Signup">Signup</TabsTrigger>
                    </TabsList>
                    
                    </Tabs>

                    </div>
                   
                  
                 </div>

             </div>
          
       </div>
    </div>
    </>
}