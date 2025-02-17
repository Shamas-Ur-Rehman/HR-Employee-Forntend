import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

export default function EmployeePayroll() {
  const [payroll, setPayroll] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [branchName, setBranchName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const invoiceRef = useRef(null);
  const EMPLOYEE_ID = 42;

  useEffect(() => {
    fetchPayroll();
    fetchEmployee();
  }, [selectedMonth]);

  const fetchPayroll = async () => {
    try {
      const response = await axios.get(`/payroll`);

      const filteredPayroll = response.data.find(
        (p) => p.employee_id === EMPLOYEE_ID && p.month === selectedMonth
      );

      if (filteredPayroll) {
        setPayroll(filteredPayroll);
      } else {
        setPayroll(null);
      }
    } catch (error) {
      console.error("Error fetching payroll:", error);
    }
  };

  const fetchEmployee = async () => {
    try {
      const employeesRes = await axios.get("/employees");
      const foundEmployee = employeesRes.data.find(emp => emp.employee_id === EMPLOYEE_ID);
      if (foundEmployee) {
        setEmployee(foundEmployee);
        fetchBranchName(foundEmployee.branch_id);
      }
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  const fetchBranchName = async (branchId) => {
    try {
      const branchRes = await axios.get(`/branches/${branchId}`);
      setBranchName(branchRes.data.branch_name);
    } catch (error) {
      console.error("Error fetching branch details:", error);
    }
  };

  const handleDownloadPDF = () => {
    if (!invoiceRef.current) {
      return;
    }

    html2canvas(invoiceRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`Payslip_${selectedMonth}_2025.pdf`);

    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 min-h-screen shadow-lg rounded-lg border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        {/* Month Selection */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded-md bg-white"
        >
          {[
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        {/* Download Button Only */}
        <button
          onClick={handleDownloadPDF}
          disabled={!payroll}
          className={`px-4 py-2 font-semibold rounded-lg flex items-center gap-2 ${payroll ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
        >
          <FaDownload /> Download as PDF
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">PAY SLIP</h1>

      {/* Pay Slip */}
      <div ref={invoiceRef} className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        {payroll && employee ? (
          <>
            {/* Header with gradient */}
            <div className="text-center bg-gradient-to-r from-[#f14f3e] to-[#fab768] p-4 rounded-md text-white">
              <h2 className="text-2xl font-bold">BYTES SOFTWARE SOLUTIONS</h2>
              <p className="text-lg font-medium">PAY SLIP</p>
            </div>

            <div className="border-b-2 border-gray-400 my-4"></div>

            {/* Employee Info */}
            <div className="grid grid-cols-2 gap-6 text-gray-800 text-sm">
              <div>
                <p><strong>Pay Date:</strong> 10-{selectedMonth}-2025</p>
                <p><strong>Employee Name:</strong> {employee.first_name} {employee.last_name}</p>
                <p><strong>Designation:</strong> {employee.job_title}</p>
                <p><strong>Department:</strong> Software Development</p>
              </div>
              <div>
                <p><strong>Pay Period:</strong> {selectedMonth}, 2025</p>
                <p><strong>Worked Days:</strong> 30</p>
                <p><strong>Branch:</strong> {branchName}</p>
              </div>
            </div>

            <div className="border-b-2 border-gray-400 my-4"></div>

            {/* Payroll Table */}
            <table className="w-full border-collapse border border-gray-300 shadow-md">
              <thead>
                <tr className="bg-gradient-to-r from-[#f14f3e] to-[#fab768] text-white">
                  <th className="border border-gray-300 px-6 py-3">EARNINGS</th>
                  <th className="border border-gray-300 px-6 py-3">AMOUNT (PKR)</th>
                  <th className="border border-gray-300 px-6 py-3">DEDUCTIONS</th>
                  <th className="border border-gray-300 px-6 py-3">AMOUNT (PKR)</th>
                  <th className="border border-gray-300 px-6 py-3">NET SALARY</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center border border-gray-300 bg-gray-50 text-gray-700">
                  <td className="border border-gray-300 px-6 py-3">Basic Salary</td>
                  <td className="border border-gray-300 px-6 py-3">{payroll.salary?.toFixed(2)}</td>
                  <td className="border border-gray-300 px-6 py-3">Tax</td>
                  <td className="border border-gray-300 px-6 py-3">{payroll.tax?.toFixed(2)}</td>
                  <td className="border border-gray-300 px-6 py-3 font-bold">{payroll.net_salary?.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <div className="border-b-2 border-gray-400 my-4"></div>

            {/* Net Payable */}
            <div className="text-right">
              <p className="text-xl font-semibold text-gray-800">NET PAYABLE: <span className="text-green-600">{payroll.net_salary?.toFixed(2)}</span></p>
              <p className="text-gray-600 font-medium mt-1">HR Manager</p>
              <p className="text-gray-600 font-medium mt-1">Kinza Sahid</p>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No payroll records found for {selectedMonth}.</p>
        )}
      </div>
    </div>
  );
}
