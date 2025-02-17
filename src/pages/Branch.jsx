import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete, MdInfo, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function BranchManagement() {
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        branch_name: "",
        location: "",
        manager: "",
        contact_number: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:8080/branches/")
            .then((response) => setBranches(response.data))
            .catch((error) => console.error("Error fetching branches:", error.message));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.branch_name || !formData.location) {
            alert("Branch name and location are required.");
            return;
        }

        const url = selectedBranch && selectedBranch.branch_id
            ? `http://localhost:8080/branches/${selectedBranch.branch_id}`
            : "http://localhost:8080/branches";
        const method = selectedBranch ? "put" : "post";

        axios[method](url, formData)
            .then(() => {
                alert(`Branch ${selectedBranch ? "updated" : "added"} successfully!`);
                setIsFormOpen(false);
                setSelectedBranch(null);
                setFormData({
                    branch_name: "",
                    location: "",
                    manager: "",
                    contact_number: "",
                });
                return axios.get("http://localhost:8080/branches");
            })
            .then((response) => setBranches(response.data))
            .catch((error) => {
                console.error("Error saving branch:", error.response ? error.response.data : error.message);
                alert(`Error: ${error.response ? error.response.data : error.message}`);
            });
    };

    const handleDelete = (branchId) => {
        if (window.confirm("Are you sure you want to delete this branch?")) {
            axios
                .delete(`http://localhost:8080/branches/${branchId}`)
                .then(() => {
                    alert("Branch deleted successfully!");
                    setBranches((prev) => prev.filter((branch) => branch.branch_id !== branchId));
                })
                .catch((error) => console.error("Error deleting branch:", error.message));
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-[#f14f3e] to-[#fab768] min-h-[100vh]">
            <div className="flex justify-between items-center mb-6">
                <button
                    className="bg-white text-[#f14f3e] px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
                    onClick={() => navigate('/dashbord')}>
                    BACK
                </button>
                <h1 className="text-3xl font-bold text-white">Branch Management</h1>
                <button
                    className="bg-white text-[#f14f3e] px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
                    onClick={() => setIsFormOpen(true)}>
                    Add Branch
                </button>
            </div>

            {/* Branch Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {branches.map((branch) => (
                    <div
                        key={branch.branch_id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-semibold text-black">{branch.branch_name}</h2>
                        <p className="text-gray-600">{branch.location}</p>
                        <p className="text-gray-600">{branch.branch_location}</p>
                        {/* <p className="text-gray-600">Lat: {branch.latitude}, Lon: {branch.longitude}</p> */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                className="flex items-center text-blue-500 hover:text-blue-700"
                                onClick={() => setSelectedBranch(branch)}>
                                <MdInfo className="mr-2" /> View Details
                            </button>
                            <button
                                className="flex items-center text-orange-500 hover:text-orange-700"
                                onClick={() => {
                                    setSelectedBranch(branch);
                                    setIsFormOpen(true);
                                    setFormData(branch);
                                }}>
                                <MdEdit className="mr-2" /> Edit
                            </button>
                            <button
                                className="flex items-center text-red-500 hover:text-red-700"
                                onClick={() => handleDelete(branch.branch_id)}>
                                <MdDelete className="mr-2" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl md:w-[90%] max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                {selectedBranch ? "Edit Branch" : "Add Branch"}
                            </h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setIsFormOpen(false)}>
                                <MdClose className="text-2xl" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="branch_name"
                                        value={formData.branch_name}
                                        onChange={handleInputChange}
                                        placeholder="Branch Name"
                                        className="p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="Location"
                                        className="p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="manager"
                                        value={formData.manager}
                                        onChange={handleInputChange}
                                        placeholder="Manager"
                                        className="p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="contact_number"
                                        value={formData.contact_number}
                                        onChange={handleInputChange}
                                        placeholder="Contact Number"
                                        className="p-2 border border-gray-300 rounded-md" />
                                </div>
                            </div>
                            <div className="flex justify-between mt-6 space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                                    onClick={() => setIsFormOpen(false)}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-[#f14f3e] to-[#fab768] text-white px-4 py-2 rounded-md">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

{selectedBranch && !isFormOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl  overflow-hidden">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-4xl font-bold text-[#f14f3e] tracking-wide">Branch Details</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => setSelectedBranch(null)}
                    >
                        <MdClose className="text-3xl" />
                    </button>
                </div>
            </div>

            {/* Branch Info in Scrollable Table */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-[#f14f3e] to-[#fab768] text-white">
                            <th className="px-6 py-4 text-left text-lg font-semibold">Field</th>
                            <th className="px-6 py-4 text-left text-lg font-semibold">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(selectedBranch).map(([key, value], index) => (
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

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white z-10 p-6 border-t border-gray-200 flex justify-end">
                <button
                    className="bg-gradient-to-r from-[#f14f3e] to-[#fab768] text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none transition-transform duration-300 transform hover:scale-105"
                    onClick={() => setSelectedBranch(null)}
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
