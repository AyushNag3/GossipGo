import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))   // Combined use of bith
}

export const colors : string[] =  [
  "bg-[#88304E] text-[#F7374F] border-[1px] border-[#F7374F]",
    "bg-[#81E7AF] text-[#077A7D] border-[1px] border-[#077A7D]",
      "bg-[#AFDDFF] text-[#1B56FD] border-[1px] border-[#1B56FD]" ,
      "bg-[#FFF085] text-[#FEBA17] border-[1px] border-[#FEBA17]" 
]

export const getColor = (color : number) => {
  if (color >= 0 && color < colors.length )  {
    return colors[color]
  }
  return colors[0]
}