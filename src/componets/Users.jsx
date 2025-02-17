import React, { useEffect, useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

const UserAvatar = ({ initials, color }) => (
  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${color}`}>
    {initials}
  </div>
);

const Users = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showExportDropdown, setShowExportDropdown] = useState(false);


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8080/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const fetchBranchName = async (branchId) => {
    try {
      const branchRes = await axios.get(`/branches/${branchId}`);
      setBranchName(branchRes.data.branch_name);
    } catch (error) {
      console.error("Error fetching branch details:", error);
    }
  };

  // Function to download data as CSV
  const downloadCSV = () => {
    const csvData = [
      ['First Name', 'Last Name', 'Date of Birth', 'Gender', 'Contact Number', 'Email', 'Address', 'Job Title', 'Department ID', 'Hire Date', 'Employment Type', 'Reporting Manager', 'Status', 'Bank Account', 'IFSC Code', 'Branch ID'],
      ...employees.map(employee => [
        employee.first_name,
        employee.last_name,
        employee.date_of_birth,
        employee.gender,
        employee.contact_number,
        employee.email,
        employee.address,
        employee.job_title,
        employee.department_id,
        employee.hire_date,
        employee.employment_type,
        employee.reporting_manager,
        employee.status,
        employee.bank_account,
        employee.ifsc_code,
        employee.branch_id
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'employees.csv';
    link.click();
  };

  // Function to download data as PDF
  const downloadPDF = () => {
    import('jspdf').then(jsPDF => {
      const doc = new jsPDF();
      let y = 10;
      doc.text('Employee Details', 10, y);
      y += 10;

      employees.forEach((employee, index) => {
        doc.text(
          `${index + 1}. ${employee.first_name} ${employee.last_name}, ${employee.email}, ${employee.job_title}`,
          10,
          y
        );
        y += 10;
      });

      doc.save('employees.pdf');
    });
  };


  return (
    <div className="bg-gray-50 p-6 overflow-y-auto custom-scrollbar  w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h1 className="text-2xl text-gray-800">Users</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <UserAvatar initials="TM" color="bg-pink-500" />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <span>Manage user details</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Company policies</span>
          </button>
          <div className="flex items-center space-x-1 px-4 py-2 bg-white rounded-lg border">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>0 / 3</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 mb-6">
        <button className="text-blue-500 border-b-2 border-blue-500 pb-2">USERS (10)</button>
        <button className="text-gray-400">ADMINS (2)</button>
        <button className="text-gray-400">ARCHIVED (0)</button>
      </div>

      {/* Controls */}
      <div className="flex justify-between mb-6">
        <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-white rounded-lg border w-64"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          </div>
          <button className="px-4 py-2 bg-white rounded-lg border" onClick={() => setShowExportDropdown(prev => !prev)}
          >
            Export
            <ChevronDown className="w-4 h-4 inline-block ml-2" />
          </button>
          {showExportDropdown && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={downloadCSV}
              >
                Download CSV
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={downloadPDF}
              >
                Download PDF
              </button>
            </div>
          )}

          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Add users
            <ChevronDown className="w-4 h-4 inline-block ml-2" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-x-auto custom-scrollbar">
      {isLoading ? (
          <p className="p-4 text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="p-4 text-center text-red-500">{error}</p>
        ) : (
          <table className="">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4">First Name</th>
                <th className="p-4">Last Name</th>
                <th className="p-4">Date of Birth</th>
                <th className="p-4">Gender</th>
                <th className="p-4">Contact Number</th>
                <th className="p-4">Email</th>
                <th className="p-4">Address</th>
                <th className="p-4">Job Title</th>
                <th className="p-4">Department ID</th>
                <th className="p-4">Hire Date</th>
                <th className="p-4">Employment Type</th>
                <th className="p-4">Reporting Manager</th>
                <th className="p-4">Status</th>
                <th className="p-4">Bank Account</th>
                <th className="p-4">IFSC Code</th>
                <th className="p-4">Branch ID</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="p-4">{employee.first_name}</td>
                  <td className="p-4">{employee.last_name}</td>
                  <td className="p-4">{employee.date_of_birth}</td>
                  <td className="p-4">{employee.gender}</td>
                  <td className="p-4">{employee.contact_number}</td>
                  <td className="p-4">{employee.email}</td>
                  <td className="p-4">{employee.address}</td>
                  <td className="p-4">{employee.job_title}</td>
                  <td className="p-4">{employee.department_id}</td>
                  <td className="p-4">{employee.hire_date}</td>
                  <td className="p-4">{employee.employment_type}</td>
                  <td className="p-4">{employee.reporting_manager}</td>
                  <td className="p-4">{employee.status}</td>
                  <td className="p-4">{employee.bank_account}</td>
                  <td className="p-4">{employee.ifsc_code}</td>
                  <td className="p-4">{employee.branch_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
