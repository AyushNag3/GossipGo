import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { SocketProvider } from './Context/SocketContext.tsx'

createRoot(document.getElementById('root')!).render(

 
    <SocketProvider>
    <App />
    <Toaster  position="top-center" richColors/>
    </SocketProvider>

)
