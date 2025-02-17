import React, { useState } from "react";
import { Info } from "lucide-react";

const AddUser = () => {
  const [users, setUsers] = useState([
    {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      contactNumber: "",
      email: "",
      address: "",
      jobTitle: "",
      departmentId: "",
      hireDate: "",
      employmentType: "",
      reportingManager: "",
      status: "",
      bankAccount: "",
      ifscCode: "",
      branchId: "",
    },
  ]);

  const addUser = () => {
    setUsers([
      ...users,
      {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        email: "",
        address: "",
        jobTitle: "",
        departmentId: "",
        hireDate: "",
        employmentType: "",
        reportingManager: "",
        status: "",
        bankAccount: "",
        ifscCode: "",
        branchId: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
  };

  const handleSubmit = async () => {
    const user = users[0];
  
    // Validate all required fields
    if (!user.firstName || !user.lastName || !user.dateOfBirth) {
      alert("Please fill out all required fields, including a valid Date of Birth.");
      return;
    }
  
    // Ensure the date is in the correct format and convert departmentId to integer
    const formattedUser = {
      first_name: user.firstName.trim(),
      last_name: user.lastName.trim(),
      date_of_birth: user.dateOfBirth.trim() ? new Date(user.dateOfBirth).toISOString().split('T')[0] : null, // Correct date format
      gender: user.gender.trim(),
      contact_number: user.contactNumber.trim(),
      email: user.email.trim(),
      address: user.address.trim(),
      job_title: user.jobTitle.trim(),
      department_id: user.departmentId.trim() ? parseInt(user.departmentId.trim()) : null, // Ensure department_id is an integer
      hire_date: user.hireDate.trim() ? new Date(user.hireDate).toISOString().split('T')[0] : null, // Correct date format
      employment_type: user.employmentType.trim(),
      reporting_manager: user.reportingManager.trim() ? parseInt(user.reportingManager.trim()) : null, // Ensure reporting_manager is an integer
      status: user.status.trim(),
      bank_account: user.bankAccount.trim(),
      ifsc_code: user.ifscCode.trim(),
      branch_id: user.branchId.trim() ? parseInt(user.branchId.trim()) : null, // Ensure branch_id is an integer
    };
  
    console.log("Request Payload:", formattedUser);
  
    try {
      const response = await fetch("http://localhost:8080/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedUser),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error:", errorMessage);
        alert(`Failed to add employee: ${errorMessage}`);
        return;
      }
  
      alert("Employee added successfully!");
      setUsers([
        {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          contactNumber: "",
          email: "",
          address: "",
          jobTitle: "",
          departmentId: "",
          hireDate: "",
          employmentType: "",
          reportingManager: "",
          status: "",
          bankAccount: "",
          ifscCode: "",
          branchId: "",
        },
      ]);
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("An error occurred. Please check your server.");
    }
  };
  
  
  
  
  
  return (
    <div className="p-2 max-w-5xl mx-auto ">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="text-gray-600 text-lg font-medium">Add New Users</div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <div className="min-w-max">
          {/* Column Headers */}
          <div className="grid grid-cols-[repeat(16,_minmax(0,_1fr))] gap-4 px-2 mb-4 bg-gray-100 sticky top-0 z-10 py-2">
            {[
              "First Name",
              "Last Name",
              "Date of Birth",
              "Gender",
              "Contact Number",
              "Email",
              "Address",
              "Job Title",
              "Department ID",
              "Hire Date",
              "Employment Type",
              "Reporting Manager",
              "Status",
              "Bank Account",
              "IFSC Code",
              "Branch ID",
            ].map((header) => (
              <div key={header} className="text-gray-700 font-semibold text-sm">
                {header}
              </div>
            ))}
          </div>

          {/* User Rows */}
          <div className="max-h-80 overflow-y-auto">
            {users.map((user, index) => (
              <div
                key={index}
                className="grid grid-cols-[repeat(16,_minmax(0,_1fr))] gap-4 px-2 mb-4"
              >
                {Object.keys(user).map((field, i) => (
                  <div key={i} className="relative">
                    {field === "gender" ||
                    field === "employmentType" ||
                    field === "status" ? (
                      <select
                        value={user[field]}
                        onChange={(e) =>
                          handleInputChange(index, field, e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="">{`Select ${field}`}</option>
                        {field === "gender" && (
                          <>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </>
                        )}
                        {field === "employmentType" && (
                          <>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Contract">Contract</option>
                          </>
                        )}
                        {field === "status" && (
                          <>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </>
                        )}
                      </select>
                    ) : (
                      <input
                        type={
                          field === "dateOfBirth" || field === "hireDate"
                            ? "date"
                            : "text"
                        }
                        value={user[field]}
                        onChange={(e) =>
                          handleInputChange(index, field, e.target.value)
                        }
                        placeholder={field
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Another User Button */}
      <button
        onClick={addUser}
        className="flex items-center gap-2 text-blue-500 hover:text-blue-600 px-4 py-2 mt-4 bg-gray-100 rounded-lg"
      >
        <span className="text-xl">+</span>
        Add Another User
      </button>

      {/* Footer */}
      <div className="flex items-center justify-between mt-8 border-t pt-4">
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" id="sendInvite" />
          <label htmlFor="sendInvite" className="text-gray-700">
            Send an Invite
          </label>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
