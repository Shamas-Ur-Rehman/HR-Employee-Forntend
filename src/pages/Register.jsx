import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdPersonOutline, MdLockOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 


function Register() {
    const navigate = useNavigate(); 

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, "Username must be at least 3 characters")
                .required("Username is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch("http://localhost:8080/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });
                if (!response.ok) {
                    const error = await response.json()
                    throw new Error(error?.error);
                }

                const data = await response.json();
                alert(`Registration successful! Welcome, ${data.username}`);
                console.log("Server Response:", data);
            } catch (error) {
                console.error("Error:", error);
                alert(error.message);
            }
        },
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-[100vh]">
            {/* Image Section */}
            <div className="col-span-1 hidden md:block">
                <img
                    src="https://i.pinimg.com/originals/88/b0/bc/88b0bca05972efa8f57d793f756c61b4.jpg"
                    alt="HR"
                    className="h-[100vh] w-full"
                />
            </div>

            {/* Form Section */}
            <div className="col-span-1 flex flex-col justify-center items-center px-6">
                <div>
                    <img
                        src="https://portalhis.supergitsa.com/images/supergit-01.png"
                        alt="HR Logo"
                        className="w-32 h-auto mx-auto"
                    />
                </div>

                <form
                    className="w-full bg-white rounded-lg p-6 text-center"
                    onSubmit={formik.handleSubmit}
                >
                    <h2 className="text-2xl font-semibold mb-6 text-center text-black">
                        Register To Your Account
                    </h2>

                    <div className="mb-4 relative border border-gray-300 shadow-md rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-80 mx-auto">
                        <MdPersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 text-2xl" />
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            className="pl-10 py-1 px-4 w-full rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.touched.username && formik.errors.username ? (
                        <div className="text-red-500 text-sm mb-2">{formik.errors.username}</div>
                    ) : null}

                    <div className="relative mb-6 border-gray-300 rounded-lg shadow-md border w-80 mx-auto">
                        <MdLockOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 text-xl" />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="pl-10 py-1 px-4 rounded-lg w-full border border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-sm mb-2">{formik.errors.password}</div>
                    ) : null}

                    <div>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#f14f3e] to-[#fab768] shadow-md shadow-black/15 text-white py-1 px-[140px] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <h3 className="text-black">
                Have an account?                    <span
                        className="hover:underline hover:text-blue-500 cursor-pointer"
                        onClick={() => navigate('/')}                     >
                        Login
                    </span>
                </h3>
            </div>
        </div>
    );
}

export default Register;
