import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../componets/LeftSidebar";
import Topbar from "../componets/Topbar";

function DashboardLayout() {
  return (
    <div className="h-[100vh] overflow-hidden bg-gray-100 flex flex-col">
      <Topbar />
      <div className="flex overflow-hidden w-full">
        <LeftSidebar />
        <div className="w-full h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar p-4">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
