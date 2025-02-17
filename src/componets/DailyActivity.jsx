import React, { useState } from 'react';
import { Clock, ChevronDown } from 'lucide-react';

const DailyActivity = () => {
  const [dateRange, setDateRange] = useState({
    start: '29/12/2024',
    end: '28/01'
  });
  const [selectedTab, setSelectedTab] = useState('activityLog');

  const activities = [
    {
      date: 'Tue 28/1',
      logs: [
        {
          type: 'time_clock',
          user: {
            name: 'Uzair Munir',
            initials: 'UM',
            color: 'bg-purple-500'
          },
          action: 'requested to edit a shift',
          details: 'on -- from -- to --',
          timestamp: 'on 28/1 at 18:05'
        },
        {
          type: 'exceeded',
          user: {
            name: 'Rehman Ali',
            initials: 'RA',
            color: 'bg-purple-600'
          },
          action: 'exceeded the daily',
          details: 'work hour limit',
          timestamp: 'on 28/1 at 17:23'
        },
        {
          type: 'exceeded',
          user: {
            name: 'husnain anwar',
            initials: 'HA',
            color: 'bg-gray-500'
          },
          action: 'exceeded the daily',
          details: 'work hour limit',
          timestamp: 'on 28/1 at 17:22'
        }
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center gap-2 text-gray-700 text-2xl font-semibold">
          <div className="text-blue-500">
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-current"></div>
              <div className="w-6 h-0.5 bg-current"></div>
              <div className="w-6 h-0.5 bg-current"></div>
            </div>
          </div>
          Activity
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b">
        <button
          onClick={() => setSelectedTab('activityLog')}
          className={`pb-4 font-medium ${selectedTab === 'activityLog' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
        >
          Activity Log
        </button>
        <button
          onClick={() => setSelectedTab('activityAnalytics')}
          className={`pb-4 font-medium flex items-center gap-2 ${selectedTab === 'activityAnalytics' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
        >
          Activity Analytics
          <span className="bg-red-400 text-white text-xs px-2 py-0.5 rounded">New</span>
        </button>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Date range:</span>
        <button className="border rounded-lg px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-blue-100">
          {dateRange.start} to {dateRange.end}
          <ChevronDown className="text-gray-400" />
        </button>
      </div>

      {/* Activity Timeline */}
      {selectedTab === 'activityLog' && (
        <div className="space-y-6">
          {activities.map((day, dayIndex) => (
            <div key={dayIndex} className="space-y-4">
              <h3 className="text-gray-600 font-semibold">{day.date}</h3>
              <div className="space-y-6">
                {day.logs.map((log, logIndex) => (
                  <div key={logIndex} className="flex items-start gap-4 transition-transform transform hover:scale-105">
                    <div className="min-w-2 bg-blue-500 h-2 w-2 rounded-full mt-2"></div>
                    <div className="bg-blue-500 rounded-full p-2">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`${log.user.color} w-8 h-8 rounded-full flex items-center justify-center text-white`}>
                        {log.user.initials}
                      </div>
                      <div>
                        <p className="text-gray-700">
                          <span className="font-medium">{log.type === 'time_clock' ? 'Time clock: ' : ''}</span>
                          {log.user.name} {log.action}
                          {log.details && <span className="text-gray-500"> {log.details}</span>}
                        </p>
                        <p className="text-gray-500 text-sm">{log.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder for Activity Analytics */}
      {selectedTab === 'activityAnalytics' && (
        <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-600">
          <p>Analytics feature coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default DailyActivity;
