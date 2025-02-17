import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete, MdInfo, MdClose } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export default function EmployeeManagement() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        contact_number: "",
        email: "",
        address: "",
        job_title: "",
        department_id: "",
        hire_date: "",
        employment_type: "",
        reporting_manager: "",
        status: "",
        bank_account: "",
        ifsc_code: "",
        branch_id: "",
    });

    // Fetch employees data on component mount
    useEffect(() => {
        axios
            .get("http://localhost:8080/employees")
            .then((response) => setEmployees(response.data))
            .catch((error) => console.error("Error fetching employees:", error.message));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date, field) => {
        setFormData({ ...formData, [field]: date });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.first_name || !formData.last_name) {
            alert("First name and last name are required.");
            return;
        }

        const updatedFormData = { ...formData };

        // Format dates
        ["date_of_birth", "hire_date"].forEach((field) => {
            if (updatedFormData[field]) {
                updatedFormData[field] = new Date(updatedFormData[field]).toISOString().split("T")[0];
            }
        });

        const url = selectedEmployee
            ? `http://localhost:8080/employees/${selectedEmployee.employee_id}`
            : "http://localhost:8080/employees";
        const method = selectedEmployee ? "put" : "post";

        axios[method](url, updatedFormData)
            .then(() => {
                alert(`Employee ${selectedEmployee ? "updated" : "added"} successfully!`);
                setIsFormOpen(false);
                setSelectedEmployee(null);
                setFormData({
                    first_name: "",
                    last_name: "",
                    date_of_birth: "",
                    gender: "",
                    contact_number: "",
                    email: "",
                    address: "",
                    job_title: "",
                    department_id: "",
                    hire_date: "",
                    employment_type: "",
                    reporting_manager: "",
                    status: "",
                    bank_account: "",
                    ifsc_code: "",
                    branch_id: "",
                });
                return axios.get("http://localhost:8080/employees");
            })
            .then((response) => setEmployees(response.data))
            .catch((error) => {
                console.error("Error saving employee:", error.response ? error.response.data : error.message);
                alert(`Error: ${error.response ? error.response.data : error.message}`);
            });
    };

    const handleDelete = (employeeId) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            axios
                .delete(`http://localhost:8080/employees/${employeeId}`)
                .then(() => {
                    alert("Employee deleted successfully!");
                    setEmployees((prev) => prev.filter((emp) => emp.employee_id !== employeeId));
                })
                .catch((error) => console.error("Error deleting employee:", error.message));
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-[#f14f3e] to-[#fab768] min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <button
                    className="bg-white text-[#f14f3e] px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
                    onClick={() => navigate("/dashbord")}
                >
                    BACK
                </button>
                <h1 className="text-3xl font-bold text-white">Employee Management</h1>
                <button
                    className="bg-white text-[#f14f3e] px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
                    onClick={() => setIsFormOpen(true)}
                >
                    Add Employee
                </button>
            </div>

            {/* Employee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {employees.map((employee) => (
                    <div
                        key={employee.employee_id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-semibold text-black">
                            {employee.first_name} {employee.last_name}
                        </h2>
                        <p className="text-gray-600">{employee.job_title}</p>
                        <div className="flex justify-between items-center mt-4">
                            <button
                                className="flex items-center text-blue-500 hover:text-blue-700"
                                onClick={() => setSelectedEmployee(employee)}
                            >
                                <MdInfo className="mr-2" /> View Details
                            </button>
                            <button
                                className="flex items-center text-orange-500 hover:text-orange-700"
                                onClick={() => {
                                    setSelectedEmployee(employee);
                                    setIsFormOpen(true);
                                    setFormData(employee);
                                }}
                            >
                                <MdEdit className="mr-2" /> Edit
                            </button>
                            <button
                                className="flex items-center text-red-500 hover:text-red-700"
                                onClick={() => handleDelete(employee.employee_id)}
                            >
                                <MdDelete className="mr-2" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-xl p-8 w-full max-w-4xl md:w-[90%] max-h-[90vh] overflow-y-auto shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-[#f14f3e]">
                                {selectedEmployee ? "Edit Employee" : "Add Employee"}
                            </h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setIsFormOpen(false)}
                            >
                                <MdClose className="text-3xl" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {Object.keys(formData).map((key) => (
                                    <div key={key} className="flex flex-col">
                                        {key === "gender" ? (
                                            <select
                                                name={key}
                                                value={formData[key]}
                                                onChange={handleInputChange}
                                                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#f14f3e] transition-all"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        ) : key === "date_of_birth" || key === "hire_date" ? (
                                            <DatePicker
                                                selected={formData[key]}
                                                onChange={(date) => handleDateChange(date, key)}
                                                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#f14f3e] transition-all"
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText={`Select ${key.replace(/_/g, " ")}`}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                name={key}
                                                value={formData[key]}
                                                onChange={handleInputChange}
                                                placeholder={key.replace(/_/g, " ").toUpperCase()}
                                                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#f14f3e] transition-all"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-6 space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 focus:outline-none transition-all"
                                    onClick={() => setIsFormOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-[#f14f3e] to-[#fab768] text-white px-6 py-3 rounded-md shadow-lg hover:shadow-xl focus:outline-none transition-all"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Details Modal */}
            {selectedEmployee && !isFormOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl">
                        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-4xl font-bold text-[#f14f3e] tracking-wide">Employee Details</h2>
                                <button
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => setSelectedEmployee(null)}
                                >
                                    <MdClose className="text-3xl" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg">
                                <thead>
                                    <tr className="bg-gradient-to-r from-[#f14f3e] to-[#fab768] text-white">
                                        <th className="px-6 py-4 text-left text-lg font-semibold">Field</th>
                                        <th className="px-6 py-4 text-left text-lg font-semibold">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(selectedEmployee).map(([key, value], index) => (
                                        <tr
                                            key={index}
                                            className={`${
                                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                            } hover:bg-gray-100 transition-colors`}
                                        >
                                            <td className="px-6 py-4 text-[#f14f3e] font-semibold capitalize text-sm md:text-base">
                                                {key.replace(/_/g, " ")}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 text-sm md:text-base">
                                                {value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="sticky bottom-0 bg-white z-10 p-6 border-t border-gray-200 flex justify-end">
                            <button
                                className="bg-gradient-to-r from-[#f14f3e] to-[#fab768] text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none transition-transform duration-300 transform hover:scale-105"
                                onClick={() => setSelectedEmployee(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
