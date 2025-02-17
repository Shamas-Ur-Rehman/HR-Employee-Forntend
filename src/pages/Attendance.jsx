import React, { useState, useEffect } from "react";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState({
    attendance_id: null,
    employee_id: null,
    attendance_date: "",
    clock_in: "",
    clock_out: "",
    clock_in_location: "",
    clock_out_location: "",
    status: "",
    branch_id: null,
    total_hours: "",
    is_late: false,
    late_duration: "",
    location_mismatch: false,
  });

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isClockedIn, setIsClockedIn] = useState(false);

  // Fetch attendance records on employee selection
  useEffect(() => {
    if (attendance.employee_id) {
      fetchAttendanceRecords(attendance.employee_id);
    }
  }, [attendance.employee_id]);

  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by your browser.");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve(`${latitude},${longitude}`);
          },
          (error) => {
            reject("Unable to retrieve your location.");
          }
        );
      }
    });
  };

  const handleClockIn = async () => {
    try {
      const location = await getCurrentLocation();
      const currentTime = new Date().toLocaleTimeString();
      setAttendance((prev) => ({
        ...prev,
        clock_in: currentTime,
        clock_in_location: location,
      }));
      setIsClockedIn(true);
      setTimer(0);
    } catch (error) {
      alert(error);
    }
  };

  const handleClockOut = async () => {
    try {
      const location = await getCurrentLocation();
      const currentTime = new Date().toLocaleTimeString();
      setAttendance((prev) => ({
        ...prev,
        clock_out: currentTime,
        clock_out_location: location,
      }));
      setIsClockedIn(false);

      // Calculate total hours
      const totalHours = Math.floor(timer / 3600);
      const totalMinutes = Math.floor((timer % 3600) / 60);
      setAttendance((prev) => ({
        ...prev,
        total_hours: `${totalHours}h ${totalMinutes}m`,
      }));
      setTimer(0);
    } catch (error) {
      alert(error);
    }
  };

  const fetchAttendanceRecords = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:8080/attendance?employee_id=${employeeId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch attendance records.");
      }
      const data = await response.json();
      setAttendanceRecords(data);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  const handleSaveAttendance = async () => {
    try {
      const response = await fetch("http://localhost:8080/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendance),
      });
      if (!response.ok) {
        throw new Error("Failed to save attendance record.");
      }
      alert("Attendance saved successfully!");
      fetchAttendanceRecords(attendance.employee_id);
    } catch (error) {
      alert(error.message);
    }
  };

  const formatTimer = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-[#f14f3e]">Attendance Management</h1>
        </div>

        {/* Attendance Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Employee ID</label>
              <input
                type="number"
                value={attendance.employee_id || ""}
                onChange={(e) =>
                  setAttendance({ ...attendance, employee_id: parseInt(e.target.value, 10) })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={attendance.attendance_date}
                onChange={(e) =>
                  setAttendance({ ...attendance, attendance_date: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Clock In/Out Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <button
                className={`w-full ${
                  isClockedIn
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#f14f3e] to-[#fab768]"
                } text-white py-2 rounded-lg shadow-md hover:shadow-lg`}
                onClick={handleClockIn}
                disabled={isClockedIn}
              >
                Clock In
              </button>
              {attendance.clock_in && (
                <p className="text-gray-700 mt-2">
                  Clock-In Time: {attendance.clock_in}
                </p>
              )}
            </div>
            <div>
              <button
                className={`w-full ${
                  !isClockedIn
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#f14f3e] to-[#fab768]"
                } text-white py-2 rounded-lg shadow-md hover:shadow-lg`}
                onClick={handleClockOut}
                disabled={!isClockedIn}
              >
                Clock Out
              </button>
              {attendance.clock_out && (
                <p className="text-gray-700 mt-2">
                  Clock-Out Time: {attendance.clock_out}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Timer */}
        {isClockedIn && (
          <div className="mt-6">
            <h3 className="text-center text-xl font-bold text-[#f14f3e]">
              Time Elapsed: {formatTimer(timer)}
            </h3>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-gradient-to-r from-[#f14f3e] to-[#fab768] text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg focus:outline-none transition duration-300"
            onClick={handleSaveAttendance}
          >
            Save Attendance
          </button>
        </div>

        {/* Attendance Records */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#f14f3e]">Past Attendance Records</h2>
          {attendanceRecords.length > 0 ? (
            <table className="min-w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Clock In</th>
                  <th className="border border-gray-300 px-4 py-2">Clock Out</th>
                  <th className="border border-gray-300 px-4 py-2">Total Hours</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {record.attendance_date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{record.clock_in}</td>
                    <td className="border border-gray-300 px-4 py-2">{record.clock_out}</td>
                    <td className="border border-gray-300 px-4 py-2">{record.total_hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-700 mt-4">No attendance records found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
