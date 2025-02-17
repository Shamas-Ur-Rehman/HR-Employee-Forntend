import React, { useState, useEffect } from 'react';
import { User, Search, Filter, Crown, Star, ChevronDown, MoreVertical, GraduationCap } from 'lucide-react';
import { IoMdInformationCircle } from "react-icons/io";
import { IoMdDownload, IoMdClose } from "react-icons/io";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";
import { motion } from "framer-motion";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(true);
  const [errorEmployees, setErrorEmployees] = useState(null);
  const [errorAdmins, setErrorAdmins] = useState(null);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);


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
        setErrorEmployees(err.message);
      } finally {
        setIsLoadingEmployees(false);
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await fetch('http://localhost:8080/admins');
        if (!response.ok) {
          throw new Error('Failed to fetch admins');
        }
        const data = await response.json();
        setAdmins(data);
      } catch (err) {
        setErrorAdmins(err.message);
      } finally {
        setIsLoadingAdmins(false);
      }
    };

    fetchEmployees();
    fetchAdmins();
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.job_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAdmins = admins.filter(admin =>
    admin.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleShowDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDownload = (downloadFunction) => {
    downloadFunction(); // Call the download function
    setShowExportDropdown(false); // Close the dropdown after clicking
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

  const downloadPDF = () => {
    import('jspdf').then(({ default: jsPDF }) => {
      const doc = new jsPDF();
      let y = 10;

      doc.text('Employee Details', 10, y);
      y += 10;

      if (employees && employees.length > 0) {
        employees.forEach((employee, index) => {
          doc.text(
            `${index + 1}. ${employee.first_name} ${employee.last_name}, ${employee.email}, ${employee.job_title}`,
            10,
            y
          );
          y += 10;
        });
      } else {
        doc.text('No employee data available.', 10, y);
      }

      doc.save('employees.pdf');
    }).catch(error => console.error("Failed to load jsPDF", error));
  };



  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <User className="text-blue-500" />
          <h1 className="text-lg sm:text-xl text-gray-700">Users</h1>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-blue-500">
            <div className="flex items-center">
              <div className="border-r pr-4">
                <div className="flex items-center gap-2">
                  <span className="bg-pink-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                    TM
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg text-sm sm:text-base">
              Manage user details
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg text-sm sm:text-base">
              Company policies
            </button>
            <div className="flex items-center gap-2">
              <GraduationCap className="text-blue-500" />
              <span>0 / 3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6">
        <button
          className={`pb-2 text-sm sm:text-base ${activeTab === 'users' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('users')}
        >
          USERS ({filteredEmployees.length})
        </button>
        <button
          className={`pb-2 text-sm sm:text-base ${activeTab === 'admins' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('admins')}
        >
          ADMINS ({filteredAdmins.length})
        </button>
        <button
          className={`pb-2 text-sm sm:text-base ${activeTab === 'archived' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('archived')}
        >
          ARCHIVED (0)
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-600 text-sm sm:text-base">
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm sm:text-base">
            {activeTab === 'admins' ? 'Add admins' : 'Add users'}
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm sm:text-base flex items-center"
            onClick={() => setShowExportDropdown((prev) => !prev)}
          >
            Export
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>

          {/* Dropdown Menu */}
          {showExportDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10"
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between px-4 py-2 text-gray-700 font-semibold border-b">
                <div className="flex items-center">
                  <IoMdDownload className="mr-2 text-blue-500" /> Export Options
                </div>
                <button onClick={() => setShowExportDropdown(false)} className="text-gray-500 hover:text-red-500">
                  <IoMdClose size={18} />
                </button>
              </div>

              {/* Download Buttons (Closes dropdown on click) */}
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition duration-200"
                onClick={() => handleDownload(downloadCSV)}
              >
                <FaFileCsv className="mr-2 text-green-500" /> Download CSV
              </button>
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition duration-200"
                onClick={() => handleDownload(downloadPDF)}
              >
                <FaFilePdf className="mr-2 text-red-500" /> Download PDF
              </button>
            </motion.div>
          )}

        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow max-h-96 overflow-auto custom-scrollbar">
        {activeTab === 'users' && (
          <>
            {isLoadingEmployees ? (
              <p className="p-4 text-center text-gray-500">Loading employees...</p>
            ) : errorEmployees ? (
              <p className="p-4 text-center text-red-500">{errorEmployees}</p>
            ) : (
              <div className="overflow-x-auto ">
                <div className="bg-white rounded-lg shadow max-h-96 overflow-auto custom-scrollbar">
                  <table className="min-w-full text-left">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-4 hidden sm:table-cell">First Name</th>
                        <th className="p-4">Last Name</th>
                        <th className="p-4 hidden sm:table-cell">Job Title</th>
                        <th className="p-4 hidden sm:table-cell">Email</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 hidden sm:table-cell">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee.id} className="border-b last:border-b-0 hover:bg-gray-50">
                          <td className="p-4 hidden sm:table-cell">{employee.first_name}</td>
                          <td className="p-4">{employee.last_name}</td>
                          <td className="p-4 hidden sm:table-cell">{employee.job_title}</td>
                          <td className="p-4 hidden sm:table-cell">{employee.email}</td>
                          <td className="p-4">{employee.status}</td>
                          <td className="p-4 cursor-pointer" onClick={() => handleShowDetails(employee)}>
                            <IoMdInformationCircle />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Modal Popup */}
                {showModal && selectedEmployee && (
                  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
                    <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl relative">
                      <div className="flex justify-between items-center mb-4 sticky top-0 bg-white p-2 z-10">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex-1 text-center">Employee Details</h2>
                        <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-500 absolute right-4 top-4 sm:static">
                          <IoMdClose size={24} />
                        </button>
                      </div>
                      <div className="max-h-[70vh] overflow-auto">
                        <table className="w-full text-left border-collapse text-sm sm:text-base">
                          <tbody>
                            {Object.entries(selectedEmployee).map(([key, value]) => (
                              <tr key={key} className="border-b">
                                <td className="p-2 font-semibold capitalize whitespace-nowrap">{key.replace('_', ' ')}</td>
                                <td className="p-2 break-words max-w-xs sm:max-w-sm md:max-w-md">{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}


              </div>
            )}
          </>
        )}

        {activeTab === 'admins' && (
          <>
            {isLoadingAdmins ? (
              <p className="p-4 text-center text-gray-500">Loading admins...</p>
            ) : errorAdmins ? (
              <p className="p-4 text-center text-red-500">{errorAdmins}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-4">First name</th>
                      <th className="p-4">Last name</th>
                      <th className="p-4">Access level</th>
                      <th className="p-4 hidden sm:table-cell">Permissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmins.map((admin) => (
                      <tr key={admin.id} className="border-b">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`${admin.color} text-white text-sm rounded-full w-8 h-8 flex items-center justify-center`}
                            >
                              {admin.initials}
                            </span>
                            {admin.firstName}
                          </div>
                        </td>
                        <td className="p-4">{admin.lastName}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            {admin.accessLevel === 'Owner' ? (
                              <Crown className="w-4 h-4" />
                            ) : (
                              <Star className="w-4 h-4" />
                            )}
                            {admin.accessLevel}
                          </div>
                        </td>
                        <td className="p-4 hidden sm:table-cell">{admin.permissions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
        {activeTab === 'archived' && (
          <>
            <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-600">
              <p>Archived feature coming soon...</p>
            </div>
          </>
        )}


      </div>

    </div >
  );
};

export default UserManagement;