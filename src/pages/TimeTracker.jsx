import React, { useState, useEffect } from 'react';
import { Clock, MapPin, ChevronLeft, ChevronRight, Plus, Sun } from 'lucide-react';

const TimeTracker = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('Fetching location...');
  const [totalWorkHours, setTotalWorkHours] = useState('01:25');
  const [totalHours, setTotalHours] = useState('01:25');

  useEffect(() => {
    let interval;
    if (isClockedIn) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const getLocation = async () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation(`${latitude},${longitude}`);
          await fetchLocationName(latitude, longitude);
          resolve(`${latitude},${longitude}`);
        },
        (error) => reject(error)
      );
    });
  };

  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      setLocationName(data.display_name || 'Unknown Location');
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Location not available");
    }
  };

  const handleClockIn = async () => {
    try {
      await getLocation();
      setClockInTime(new Date());
      setElapsedTime(0);
      setIsClockedIn(true);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const handleClockOut = async () => {
    try {
      const checkoutLocation = await getLocation();
      const now = new Date();
      setClockOutTime(now);
      setIsClockedIn(false);

      const attendanceData = {
        employee_id: 1,
        attendance_date: now.toISOString().split('T')[0],
        clock_in: clockInTime.toLocaleTimeString('en-GB'),
        clock_in_location: location,
        clock_out: now.toLocaleTimeString('en-GB'),
        clock_out_location: checkoutLocation,
        status: "Present",
        branch_id: 1
      };

      const response = await fetch('http://localhost:8080/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(attendanceData)
      });

      if (response.ok) {
        console.log("Attendance recorded successfully");
      } else {
        console.error("Failed to record attendance");
      }
    } catch (error) {
      console.error("Error recording attendance:", error);
    }
  };

  const renderTimesheetTable = () => (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Timesheet</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border rounded-lg px-4 py-2">
            <ChevronLeft className="text-gray-400" />
            <span>02/01 to 01/02</span>
            <ChevronRight className="text-gray-400" />
          </div>
          <button className="text-blue-500 hover:underline">Select empty days</button>
          <button className="text-blue-500 hover:underline">Export</button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-gray-500 mb-6">
        <div>
          <div className="text-lg font-semibold text-gray-700">{totalHours}</div>
          <div>Regular</div>
        </div>
        <div className="text-2xl">+</div>
        <div>
          <div className="text-lg font-semibold text-gray-700">00:00</div>
          <div>Paid time off</div>
        </div>
        <div className="text-2xl">=</div>
        <div>
          <div className="text-lg font-semibold text-gray-700">{totalHours}</div>
          <div>Total Paid Hours</div>
        </div>
        <div className="ml-auto">
          <div className="text-lg font-semibold text-gray-700">00:00</div>
          <div>Unpaid time off</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-t-lg">
        <div className="grid grid-cols-8 gap-4 p-4 text-gray-600 font-semibold">
          <div>Date</div>
          <div>Type</div>
          <div>Sub job</div>
          <div>Start</div>
          <div>End</div>
          <div>Total hours</div>
          <div>Daily total</div>
          <div>Weekly total</div>
        </div>
        {["Mon 27/1", "Tue 28/1", "Wed 29/1", "Thu 30/1", "Fri 31/1", "Sat 1/2"].map((day, index) => (
          <div
            key={index}
            className={`grid grid-cols-8 gap-4 p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}
          >
            <div>{day}</div>
            <div>{day === "Mon 27/1" ? "backend ..." : "--"}</div>
            <div>--</div>
            <div>{day === "Mon 27/1" ? "10:49" : "--"}</div>
            <div>{day === "Mon 27/1" ? "12:14" : "--"}</div>
            <div>{day === "Mon 27/1" ? "01:25" : "--"}</div>
            <div>{day === "Mon 27/1" ? "01:25" : "--"}</div>
            <div>{day === "Mon 27/1" ? totalWorkHours : ""}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full  bg-gray-100 p-8 ">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Today's clock</h2>
            {isClockedIn ? (
              <div className="bg-gradient-to-r from-[#f14f3e] to-[#fab768] rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <span>Work time on</span>
                  <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm">backend ...</span>
                </div>
                <div className="text-5xl font-bold mb-4">{formatTime(elapsedTime)}</div>
                <div className="flex items-center gap-2 text-sm mb-4">
                  <MapPin size={16} />
                  <span>{locationName}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span>Total work hours for Mon, Jan 27</span>
                    <span>{formatTime(elapsedTime)}</span>
                  </div>
                <button className="w-full mt-4 bg-gradient-to-r from-[#f14f3e] to-[#fab768] border border-white text-white py-3 rounded-lg flex items-center justify-center gap-2" onClick={handleClockOut}>
                  End
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <button className="w-48 h-48 bg-gradient-to-r from-[#f14f3e] to-[#fab768] rounded-full flex flex-col items-center justify-center text-white" onClick={handleClockIn}>
                  <Clock className="w-8 h-8 mb-2" />
                  <span className="text-xl">Clock in</span>
                </button>
              </div>
            )}
          </div>
          {/* Requests Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Requests</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center gap-3 text-gray-700 hover:bg-gray-50 p-2 rounded-lg">
                <div className="bg-blue-500 p-2 rounded-full">
                  <Plus className="text-white" />
                </div>
                Add a shift request
              </button>
              <button className="w-full flex items-center gap-3 text-gray-700 hover:bg-gray-50 p-2 rounded-lg">
                <div className="bg-emerald-500 p-2 rounded-full">
                  <Sun className="text-white" />
                </div>
                Add an absence request
              </button>
              <button className="w-full text-blue-500 border border-gray-400 rounded-full hover:bg-gradient-to-r from-[#f14f3e] to-[#fab768] hover:text-white text-center py-2 ">
                View your requests
              </button>
            </div>
          </div>
          
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          {renderTimesheetTable()}
        </div>
        
      </div>
    </div>
  );
};

export default TimeTracker;
