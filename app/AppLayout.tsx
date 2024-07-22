import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";import React from 'react'

export default function AppLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <div>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="bg-gray-100 w-full px-8 ml-[255px] mt-[90px]">{children}</div>
        </div>
      </div>
    )
}