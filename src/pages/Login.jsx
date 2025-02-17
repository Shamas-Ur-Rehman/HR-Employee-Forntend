import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { MdPersonOutline, MdLockOutline } from "react-icons/md";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.post('http://localhost:8080/auth/login', {
                    username: values.username,
                    password: values.password
                });

                if (response.data && response.data.token) {
                    localStorage.setItem('authToken', response.data.token);

                    // console.log('Login successful:', response.data);
                    navigate('/dashboard');
                } else {
                    setError('Login failed. Please check your credentials.');
                }

            } catch (error) {
                console.error('Error logging in:', error.response ? error.response.data : error.message);
                setError('Login failed. Please check your credentials.');
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-[100vh]">
            <div className="col-span-1 hidden md:block">
                <img
                    src="https://i.pinimg.com/originals/88/b0/bc/88b0bca05972efa8f57d793f756c61b4.jpg"
                    alt="Super Git"
                    className="h-[100vh] w-full"
                />
            </div>

            <div className="col-span-1 flex flex-col justify-center items-center px-6">
                <div>
                    <img
                        src="https://portalhis.supergitsa.com/images/supergit-01.png"
                        alt="Super Git Logo"
                        className="w-32 h-auto mx-auto"
                    />
                </div>

                <form className="w-full bg-white rounded-lg p-6 text-center" onSubmit={formik.handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-6 text-center text-black">Login To Your Account</h2>

                    <div className="mb-4 relative border border-gray-300 shadow-md rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-80 mx-auto">
                        <MdPersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 text-2xl" />
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            className="pl-10 py-1 px-4 w-full rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="relative mb-6 border-gray-300 rounded-lg shadow-md border w-80 mx-auto">
                        <MdLockOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 text-xl" />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            className="pl-10 py-1 px-4 rounded-lg w-full border border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-[#f14f3e] to-[#fab768] shadow-md shadow-black/15 text-white py-1 px-[140px] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                <h3 className="text-black">
                    Don't have an account?
                    <span
                        className="hover:underline hover:text-blue-500 cursor-pointer"
                        onClick={() => navigate('/register')} 
                    >
                        Sign up
                    </span>
                </h3>
            </div>
        </div>
    );
}

export default Login;
