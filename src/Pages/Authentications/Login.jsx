import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Button } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { MdEmail, MdLock, MdBloodtype } from 'react-icons/md';
import { GiSyringe } from 'react-icons/gi';
import { FaHeartbeat, FaHandsHelping } from 'react-icons/fa';
import { IoEye } from 'react-icons/io5';
import { PiEyeClosedBold } from "react-icons/pi";
import useAuth from '../../CustomHooks/useAuth';
import Swal from 'sweetalert2';

const floatingIconVariants = {
    float: {
        y: [0, -15, 0],
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const Login = () => {
    const { loginUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // <-- loading state
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (location.pathname === "/login-user") {
            window.document.title = "Login | Blood Bond";
        }
    }, [location.pathname]);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password } = Object.fromEntries(formData);

        setIsLoading(true); // start loading

        loginUser(email, password)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Login complete!",
                    icon: "success",
                    background: "#fff",
                    color: "#16a34a",
                    confirmButtonColor: "#dc2626",
                    confirmButtonText: "Awesome!",
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Oops!",
                    text: error.message || "Something went wrong",
                    icon: "error",
                    background: "#fff",
                    color: "#b91c1c",
                    confirmButtonColor: "#b91c1c",
                    confirmButtonText: "Try Again",
                });
            })
            .finally(() => {
                setIsLoading(false); // stop loading
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffe6e6] to-[#ffffff] px-4 relative overflow-hidden">
            {/* Background floating icons */}
            <motion.div 
                variants={floatingIconVariants} 
                animate="float" 
                style={{ opacity: 0.28 }} 
                className="absolute top-6 left-6 text-red-300 text-4xl pointer-events-none select-none" 
                aria-hidden="true" >
                     <MdBloodtype /> 
            </motion.div> 
            <motion.div 
                variants={floatingIconVariants} 
                animate="float" 
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }} 
                style={{ opacity: 0.26 }} className="absolute top-20 right-14 text-red-300 text-3xl pointer-events-none select-none" aria-hidden="true" > 
                <GiSyringe /> 
            </motion.div> 

            <motion.div 
                variants={floatingIconVariants} 
                animate="float" 
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} 
                style={{ opacity: 0.3 }} 
                className="absolute bottom-28 left-10 text-red-300 text-5xl pointer-events-none select-none" 
                aria-hidden="true" > 
                <FaHeartbeat /> 
            </motion.div> 

            <motion.div 
                variants={floatingIconVariants} 
                animate="float" 
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }} 
                style={{ opacity: 0.27 }} 
                className="absolute bottom-14 right-20 text-red-300 text-4xl pointer-events-none select-none" 
                aria-hidden="true" > 
                <MdEmail /> 
            </motion.div> 
            
            <motion.div 
                variants={floatingIconVariants} 
                animate="float" 
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }} 
                style={{ opacity: 0.26 }} 
                className="absolute top-1/2 left-1/4 -translate-y-1/2 text-red-300 text-6xl pointer-events-none select-none" aria-hidden="true" > 
                <MdLock /> 
            </motion.div> 
            
            <motion.div 
                variants={floatingIconVariants} 
                animate="float" 
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }} 
                style={{ opacity: 0.28 }} 
                className="absolute top-1/3 right-1/3 text-red-300 text-5xl pointer-events-none select-none"
                aria-hidden="true" > 
                <FaHandsHelping /> 
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={formVariants}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 relative z-10"
            >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-2 text-gray-800">
                    Welcome Back!
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-center text-red-600">
                    Login to Your Account
                </h2>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block mb-1 text-gray-700 font-medium">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className='relative'>
                        <label htmlFor="password" className="block mb-1 text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                            placeholder="Your password"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <IoEye className="text-gray-500 absolute right-5 top-2/3 transform -translate-y-1/2 cursor-pointer" />
                            ) : (
                                <PiEyeClosedBold className="text-gray-500 absolute right-5 top-2/3 transform -translate-y-1/2 cursor-pointer" />
                            )}
                        </button>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-red-600 text-white py-2 sm:py-3 text-base rounded-lg font-semibold 
                            ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-red-800"} 
                            transition duration-200 shadow-md`}
                    >
                        {isLoading ? "Signing in..." : "Login"}
                    </Button>
                </form>

                <p className="mt-5 text-center text-sm sm:text-base text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/user-registration" className="text-red-600 font-semibold hover:underline">
                        Register Here
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
