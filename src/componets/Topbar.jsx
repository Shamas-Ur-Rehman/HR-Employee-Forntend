import React, { useState } from "react";
import {
  MdSettings,
  MdExitToApp,
  MdArrowDropDown,
  MdArrowDropUp,
  MdSearch,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
function Topbar() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
  
    const navigate = useNavigate();
  
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
    const handleLogout = () => {
      localStorage.removeItem("authToken");
      navigate("/");
    };
  return (
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
              <MdSearch className="absolute right-[600px] top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
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
  )
}

export default Topbar
