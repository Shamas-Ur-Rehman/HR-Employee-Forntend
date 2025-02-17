import React from "react";
import {
  Search,
  UserPlus,
  Crown,
  CheckSquare,
  Mail,
  Filter, RefreshCw, Bell,
} from "lucide-react";
function MainContent() {

  return (

    <div className="flex bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="flex-1 p-4 ">
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

          <div className="relative flex items-center justify-between mt-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <div className="ml-4 flex space-x-2">
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <Filter className="w-5 h-5 text-gray-400 hover:text-gray-400" />
              </button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <RefreshCw className="w-5 h-5 text-gray-400 hover:text-gray-400" />
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
            <div className="text-3xl font-bold text-gray-900">0</div>
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
        <div className="bg-white p-4 rounded-lg shadow-md text-center mt-3 text-gray-600">
          <p>Analytics feature coming soon...</p>
        </div>

      </div>
      {/* Right Sidebar */}
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

    </div>

  )
}

export default MainContent
