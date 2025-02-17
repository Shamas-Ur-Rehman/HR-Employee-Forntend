// LeftSidebar.jsx
import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineAppstore, AiOutlineSetting } from "react-icons/ai";
import { GoFileDirectory } from "react-icons/go";
import { Clock } from 'lucide-react';
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FiMenu } from "react-icons/fi";
import { PiChats } from "react-icons/pi";
import { GrDocumentUpdate } from "react-icons/gr";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BsCashCoin } from "react-icons/bs";


function LeftSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const navigate = useNavigate();

  const handleNavigation = (label) => {
    setSelectedItem(label);
    const routes = {
      "Overview": "/dashboard/",
      "Time clock": "/dashboard/time-tracker",
      "Activity": "/dashboard/activity",
      "Smart Groups": "/dashboard/smart-groups",
      "Pay Roll": "/dashboard/emppayroll"

    };
    if (routes[label]) {
      navigate(routes[label]);
    }
  };

  return (
    <div className={`bg-[#373D45] border-r transition-all duration-300 ${isSidebarOpen ? "w-40" : "w-10"} flex flex-col h-screen sticky`}>
      {/* Toggle Button */}
      <div className={`p-4 flex ${isSidebarOpen ? "justify-end" : "justify-center"}`}>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full bg-gradient-to-r from-[#f14f3e] to-[#fab768] text-white shadow-lg hover:scale-110 transition-transform"
        >
          {isSidebarOpen ? <MdChevronLeft size={24} /> : <MdChevronRight size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-grow space-y-2 overflow-y-auto">
        {[
          { icon: <AiOutlineAppstore />, label: "Overview" },
          { icon: <FiMenu />, label: "Activity" },
          { divider: true },
          { icon: <Clock />, label: "Time clock" },
          { icon: <BsCashCoin />, label: "Pay Roll" },

          { icon: <HiOutlineUserGroup />, label: "Smart Groups" },
          { divider: true, label: "Communication" },
          { icon: <PiChats />, label: "Chat" },
          { icon: <GrDocumentUpdate />, label: "Updates" },
          { icon: <GoFileDirectory />, label: "Directory" },
          { icon: <RiCustomerService2Fill />, label: "Help Desk" },
          { icon: <AiOutlineSetting />, label: "Settings" },
          { icon: <MdLogout />, label: "Logout" },
        ].map((item, index) =>
          item.divider ? (
            <div key={index} className="border-t border-gray-500 my-2"></div>
          ) : (
            <div
              key={index}
              className={`flex items-center space-x-2 p-1 text-white rounded-lg cursor-pointer transition-all duration-200 ${
                selectedItem === item.label ? "bg-[#f14f3e] text-white" : "hover:bg-gradient-to-r from-[#f14f3e] to-[#fab768] hover:opacity-90"
              }`}
              onClick={() => handleNavigation(item.label)}
            >
              <div className="w-6 h-6 flex items-center justify-center text-white">{item.icon}</div>
              {isSidebarOpen && <span className="text-left font-medium">{item.label}</span>}
            </div>
          )
        )}
      </nav>
    </div>
  );
}

export default LeftSidebar;
