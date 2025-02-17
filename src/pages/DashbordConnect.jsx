import React, { useState } from "react";
import {
  Bell,
  Search,
  UserPlus,
  Crown,
  CheckSquare,
  Mail,
  Filter, RefreshCw,
} from "lucide-react";
import {
  MdSettings,
  MdExitToApp,
  MdArrowDropDown,
  MdArrowDropUp,
  MdChevronLeft,
  MdChevronRight,
  MdSearch,
} from "react-icons/md";
import { AiOutlineAppstore } from "react-icons/ai";
import { GoFileDirectory } from "react-icons/go";
import { SlUser } from "react-icons/sl";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FiMenu } from "react-icons/fi";
import { PiChats } from "react-icons/pi";
import { GrDocumentUpdate } from "react-icons/gr";
import { RiCustomerService2Fill } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const DashbordConnect = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState('')

  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
      {/* Top Navbar */}
      <div className="bg-[#373D45] p-2 flex items-center justify-between shadow-md">
        {/* Dashboard Icon */}
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D0BAQFAJ-ArwUZ_rg/company-logo_200_200/company-logo_200_200/0/1694884921945/bytes_software_house_logo?e=2147483647&v=beta&t=9c5eYjrKSq7hO9LT3UMbkHz0I5yACGuEizcUN4-b1yc"
            alt="Dashboard Icon"
            className="w-10 h-10 rounded-full"
          />
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4 relative">
          <input
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md pl-4 pr-8 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-200"
          />
          <MdSearch className="absolute right-[590px] top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>

        {/* Profile Section */}
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white transition-all duration-300"
            />
            <span className="text-white ml-2 hidden sm:block">
              John Doe
            </span>
            {isDropdownOpen ? (
              <MdArrowDropUp className="text-white text-2xl ml-1" />
            ) : (
              <MdArrowDropDown className="text-white text-2xl ml-1" />
            )}
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-xl p-4 border z-50">
              <div className="text-black font-semibold text-xl mb-2">
                John Doe
              </div>
              <div className="text-gray-600 mb-2">johndoe@example.com</div>
              <div className="border-b border-gray-200 mb-2"></div>
              <div className="flex flex-col space-y-2">
                <button
                  className="flex items-center text-blue-500 hover:text-blue-700 p-2 rounded-md transition-colors"
                  onClick={() => alert("Profile settings")}
                >
                  <MdSettings className="mr-2" /> Profile Settings
                </button>
                <button
                  className="flex items-center text-red-500 hover:text-red-700 p-2 rounded-md transition-colors"
                  onClick={handleLogout}
                >
                  <MdExitToApp className="mr-2" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-grow mt-1">

        {/* Left Side Bar */}
        <div
          className={`bg-[#373D45] border-r transition-all duration-300 ${isSidebarOpen ? "w-40" : "w-10"}
             flex flex-col h-screen`}
        >
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
            {/* Navigation Items */}
            {[
              { icon: <AiOutlineAppstore />, label: "Overview" },
              { icon: <FiMenu />, label: "Activity" },
              { divider: true },
              { icon: <SlUser />, label: "Users" },
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
                  className={`flex items-center space-x-2 p-1 text-white rounded-lg cursor-pointer transition-all duration-200 ${selectedItem === item.label ? 'bg-[#f14f3e] text-white' : 'hover:bg-gradient-to-r from-[#f14f3e] to-[#fab768] hover:opacity-90'
                    }`}
                  onClick={() => setSelectedItem(item.label)} // Assuming setSelectedItem is a function to manage the active state
                >
                  <div className="w-6 h-6 flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  {isSidebarOpen && (
                    <span className="text-left font-medium">{item.label}</span>
                  )}
                </div>
              )
            )}
          </nav>

          {/* Inline styles for scrollbar */}
          <style>
            {`
               /* Webkit-based browsers (e.g., Chrome, Edge, Safari) */
               .bg-[#373D45]::-webkit-scrollbar {
                 width: 2px; /* Thinner scrollbar */
               }
               .bg-[#373D45]::-webkit-scrollbar-track {
                 background: transparent; /* Transparent track */
               }
               .bg-[#373D45]::-webkit-scrollbar-thumb {
                 background: #f14f3e; /* Scrollbar thumb color */
                 border-radius: 8px; /* Rounded scrollbar thumb */
               }
               .bg-[#373D45]::-webkit-scrollbar-thumb:hover {
                 background: #fab768; /* Thumb color on hover */
               }
         
               /* Firefox scrollbar styling */
               .bg-[#373D45] {
                 scrollbar-width: thin; /* Thin scrollbar for Firefox */
                 scrollbar-color: #f14f3e transparent; /* Thumb and track colors */
               }
             `}
          </style>
        </div>



        {/* Main Content */}

        <div className="flex-1 p-4 bg-gradient-to-r from-gray-100 to-gray-200">
          {selectedItem === "Users" ? (
            <h1>Shamas</h1>
          ) : selectedItem === "Smart Groups" ? (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">All Users Group</h1>
              <p>This section displays all user groups.</p>
            </div>
          ) : selectedItem === "Communication" ? (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Communication</h1>
              <p>This section displays Communication.</p>
            </div>
          ) : (
            <>
              {/* Quick Actions Section */}
              <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-4 gap-4 mb-8">
                <button className="p-4 bg-gradient-to-br from-green-500 to-green-400 text-white rounded-xl shadow-md hover:shadow-lg flex flex-col items-center justify-center space-y-1">
                  <UserPlus className="w-6 h-6" />
                  <span>Add Users</span>
                </button>

                <button className="p-4 bg-gradient-to-br from-orange-500 to-orange-400 text-white rounded-xl shadow-md hover:shadow-lg flex flex-col items-center justify-center space-y-1">
                  <Crown className="w-6 h-6" />
                  <span>Add Admins</span>
                </button>

                <button className="p-4 bg-gradient-to-br from-purple-500 to-purple-400 text-white rounded-xl shadow-md hover:shadow-lg flex flex-col items-center justify-center space-y-1">
                  <CheckSquare className="w-6 h-6" />
                  <span>Add a Task</span>
                </button>

                <button className="p-4 bg-gradient-to-br from-blue-500 to-blue-400 text-white rounded-xl shadow-md hover:shadow-lg flex flex-col items-center justify-center space-y-1">
                  <Mail className="w-6 h-6" />
                  <span>Send an Update</span>
                </button>
              </div>

              {/* Attendance */}
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Attendance</h2>

                <div className="relative flex items-center justify-center mt-4">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-64 pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
                  />
                  <Search className="absolute left-1/2 transform -translate-x-32 top-3.5 w-4 h-4 text-gray-400" />

                  <div className="absolute right-10 flex space-x-2">
                    <button>
                      <Filter className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </button>
                    <button>
                      <RefreshCw className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-sm hover:shadow-md">
                  <div className="text-3xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-600">Running Late</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-sm hover:shadow-md">
                  <div className="text-3xl font-bold text-gray-900">6</div>
                  <div className="text-sm text-gray-600">Clocked In</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-sm hover:shadow-md">
                  <div className="text-3xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-600">On Time Off</div>
                </div>
              </div>

              {/* Engagement Section */}
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Engagement</h2>
              <div className="flex space-x-4">
                <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300">
                  <option>All Users Group</option>
                </select>

                <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300">
                  <option>Day</option>
                </select>

                <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300">
                  <option>23/12/2024 to 06/01</option>
                </select>
              </div>
            </>
          )}
        </div>



       
      </div>
    </div>
  );
};

export default DashbordConnect;
