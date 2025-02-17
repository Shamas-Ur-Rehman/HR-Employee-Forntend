import React, { useState } from 'react';
import {
  MdPersonAdd,
  MdSettings,
  MdExitToApp,
  MdCorporateFare,
  MdOutlineGroupWork,
  MdOutlineAssignmentInd,
  MdOutlineWork,
  MdOutlineAssignment,
  MdOutlineCalendarToday,
  MdOutlineRateReview,
  MdOutlineLock,
  MdOutlineCalendarViewDay,
  MdOutlineAccessTime,
  MdOutlineSchool,
  MdOutlineFactCheck,
  MdDashboard,
} from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai"; 
import { useNavigate } from 'react-router-dom'; 

export default function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate(); 

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleAddEmployee = () => {
    navigate('/employee'); 
  };

  const handleAddBranch = () => {
    navigate('/branch');
  };

  const cards = [
    { title: "Overview", description: "Manage your workspace, employees, and projects all in one place.", icon: <MdDashboard/> },
    { title: "Employees", description: "View and manage your team efficiently with powerful tools.", icon: <AiOutlineTeam />, action: handleAddEmployee },
    { title: "Branch", description: "Manage and add branches across locations.", icon: <MdCorporateFare />, action: handleAddBranch },
    { title: "Department", description: "Organize and manage company departments.", icon: <MdOutlineGroupWork /> },
    { title: "Employee Role", description: "Define roles and responsibilities for employees.", icon: <MdOutlineAssignmentInd /> },
    { title: "Enrollment", description: "Handle employee onboarding efficiently.", icon: <MdOutlineWork /> },
    { title: "Jobs", description: "Manage job postings and positions.", icon: <MdOutlineAssignment /> },
    { title: "Job Applications", description: "Track and review job applications.", icon: <MdOutlineAssignment /> },
    { title: "Payroll", description: "Manage payroll and salary structures.", icon: <MdOutlineCalendarToday /> },
    { title: "Performance Review", description: "Evaluate and improve employee performance.", icon: <MdOutlineRateReview /> },
    { title: "Permissions", description: "Control access and user permissions.", icon: <MdOutlineLock /> },
    { title: "Leaves", description: "Track and approve employee leaves.", icon: <MdOutlineCalendarToday /> },
    { title: "Roles", description: "Define and assign roles within the company.", icon: <MdOutlineAssignmentInd /> },
    { title: "Role Permissions", description: "Manage permissions tied to specific roles.", icon: <MdOutlineLock /> },
    { title: "Roster", description: "Create and manage staff rosters effectively.", icon: <MdOutlineCalendarViewDay /> },
    { title: "Shift", description: "Set up and manage employee shifts.", icon: <MdOutlineAccessTime /> },
    { title: "Timing Slot", description: "Define work timing slots for employees.", icon: <MdOutlineAccessTime /> },
    { title: "Training Programs", description: "Plan and manage training programs.", icon: <MdOutlineSchool /> },
    { title: "Attendance", description: "Track attendance records.", icon: <MdOutlineFactCheck /> },
    { title: "Settings", description: "Customize your system settings to meet your business needs.", icon: <MdSettings /> },
  ];

  // Filtered cards based on search query
  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-r from-[#f14f3e] to-[#fab768] h-[100vh] p-6 overflow-y-auto">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-10 flex-wrap">
        <h1 className="text-white font-sans font-bold text-3xl mb-4 md:mb-0">Bytes HR Dashboard</h1>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Profile Section with Dropdown */}
        <div className="relative">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Profile"
            className="w-16 h-16 rounded-full border-4 border-white cursor-pointer hover:border-[#fab768] transition-all duration-300"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-xl p-4 border-2 border-[#fab768] z-50">
              <div className="text-black font-semibold text-xl mb-2">John Doe</div>
              <div className="text-gray-600 mb-2">johndoe@example.com</div>
              <div className="border-b border-gray-200 mb-2"></div>
              <div className="flex flex-col space-y-2">
                <button
                  className="flex items-center text-blue-500 hover:text-blue-700 p-2 rounded-md transition-colors duration-300"
                  onClick={() => alert('Profile settings')} >
                  <MdSettings className="mr-2" /> Profile Settings
                </button>
                <button
                  className="flex items-center text-red-500 hover:text-red-700 p-2 rounded-md transition-colors duration-300"
                  onClick={handleLogout}>
                  <MdExitToApp className="mr-2" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl text-[#f14f3e]">{card.icon}</div>
              <h3 className="text-xl font-semibold text-black">{card.title}</h3>
            </div>
            <p className="text-gray-600">{card.description}</p>
            <div className="mt-4">
              <button
                className="flex items-center bg-gradient-to-r from-[#f14f3e] to-[#fab768] text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={card.action}
              >
                <MdPersonAdd className="mr-2 text-xl" /> Add {card.title}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
