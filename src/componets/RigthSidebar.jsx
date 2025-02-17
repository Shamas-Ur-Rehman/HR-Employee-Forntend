import React, { useState } from "react";
import {
  Bell,
} from "lucide-react";

function RigthSidebar() {
  return (
   <div className="hidden lg:block w-90 bg-gradient-to-b from-gray-100 to-gray-200 border-l border-gray-300 p-6">
             {/* Pending Requests Section */}
             <div className="mb-6">
               <h2 className="text-xl font-bold text-gray-800 mb-4">You have 3 pending requests</h2>
               <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-300">
                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                   <Bell className="w-5 h-5 text-blue-600" />
                 </div>
                 <div>
                   <div className="font-semibold text-gray-800">Timesheets requests</div>
                   <div className="text-sm text-gray-500">Time clock</div>
                 </div>
                 <div className="ml-auto">
                   <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm">3</span>
                 </div>
               </div>
             </div>
   
             {/* About Connecteam Section */}
             <div>
               <h2 className="text-xl font-bold text-gray-800 mb-4">All about Connecteam</h2>
               <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl aspect-video shadow-md hover:shadow-lg"></div>
             </div>
           </div>
  )
}

export default RigthSidebar
