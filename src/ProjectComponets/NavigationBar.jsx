import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { IoPersonCircleOutline } from 'react-icons/io5';
import useAuth from '../CustomHooks/useAuth';
import logo from '../assets/logo.png';
import { HiMenu } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import Swal from 'sweetalert2';
import { Button } from '@material-tailwind/react';

const NavLinks = ({ user }) => (
    <>
        <li className="text-lg flex items-center space-x-2">
            <NavLink to="/" className="relative inline-block group px-1 py-0.5">
                {({ isActive }) => (
                    <span className={`relative inline-block hover:text-red-600 ${isActive ? 'text-red-600 font-semibold' : 'text-gray-800'}`}>
                        Home
                        <span
                            className={`absolute left-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0'
                                } group-hover:w-full`}
                        ></span>
                    </span>
                )}
            </NavLink>
        </li>

        <li className="text-lg flex items-center space-x-2">
            <NavLink to="/categories" className="relative inline-block group px-1 py-0.5">
                {({ isActive }) => (
                    <span className={`relative inline-block hover:text-red-600 ${isActive ? 'text-red-600 font-semibold' : 'text-gray-800'}`}>
                        Donation Requests
                        <span
                            className={`absolute left-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0'
                                } group-hover:w-full`}
                        ></span>
                    </span>
                )}
            </NavLink>
        </li>

        <li className="text-lg flex items-center space-x-2">
            <NavLink to="/blogs" className="relative inline-block group px-1 py-0.5">
                {({ isActive }) => (
                    <span className={`relative inline-block hover:text-red-600 ${isActive ? 'text-red-600 font-semibold' : 'text-gray-800'}`}>
                        Blog
                        <span
                            className={`absolute left-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0'
                                } group-hover:w-full`}
                        ></span>
                    </span>
                )}
            </NavLink>
        </li>

        {user && <>
            <li className="text-lg flex items-center space-x-2">
                <NavLink to="/funding" className="relative inline-block group px-1 py-0.5">
                    {({ isActive }) => (
                        <span className={`relative inline-block hover:text-red-600 ${isActive ? 'text-red-600 font-semibold' : 'text-gray-800'}`}>
                            Funding
                            <span
                                className={`absolute left-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0'
                                    } group-hover:w-full`}
                            ></span>
                        </span>
                    )}
                </NavLink>
            </li>
            <li className="text-lg flex items-center space-x-2">
                <NavLink to="/dashboard" className="relative inline-block group px-1 py-0.5">
                    {({ isActive }) => (
                        <span className={`relative inline-block hover:text-red-600 ${isActive ? 'text-red-600 font-semibold' : 'text-gray-800'}`}>
                            Dashboard
                            <span
                                className={`absolute left-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0'
                                    } group-hover:w-full`}
                            ></span>
                        </span>
                    )}
                </NavLink>
            </li>

        </>}
    </>
);

const NavigationBar = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSignOut = () => {
        Swal.fire({
            title: "Logout Successful",
            icon: "success",
            draggable: true,
        });
        logout();
    }

    return (
        <div className="w-full bg-red-50 fixed left-0 right-0 z-1000">
            <nav className="flex justify-between mx-4 items-center py-3 z-1000">

                {/* LOGO */}
                <div className="flex items-center gap-4">

                    {/* RESPONSIVE NAVBAR LINKS BY MENU ICON */}
                    <div className="flex gap-2" onClick={() => setOpen(!open)}>
                        {open ? (
                            <IoCloseSharp className="lg:hidden h-5 w-5 md:w-7 md:h-7 text-red-600" />
                        ) : (
                            <HiMenu className="lg:hidden h-5 w-5 md:w-7 md:h-7 text-red-600" />
                        )}

                        <ul
                            className={`lg:hidden absolute space-y-3 left-1/2 transform -translate-x-1/2 duration-300 ease-in-out transition-all font-semibold bg-white rounded-md shadow-lg w-full p-6 backdrop-blur-lg z-50
                        ${open ? "top-18 md:top-17 opacity-100 scale-100" : "top-10 opacity-0 scale-90 pointer-events-none"}
                      `}
                        >
                            {NavLinks({ user })}
                        </ul>
                    </div>
                    {/* applications image */}
                    <img className="w-10 h-10 sm:w-12 sm:h-12 md:h-13 md:w-13" src={logo} alt="logo of blood bond" />
                    <h3 className="hidden md:block md:self-center md:text-xl xl:text-3xl font-semibold"><span className='text-red-600'>B</span>lood Bond</h3>
                </div>

                {/* NAVBAR LINKS */}
                <div className="hidden lg:flex">
                    <ul className="flex lg:gap-4 xl:gap-8">{NavLinks({ user })}</ul>
                </div>

                {/* LOGIN/REGISTER */}
                {
                    user ? <>
                        <div className="mr-3 cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            {
                                user?.photoURL ? (
                                    <img
                                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-15 lg:h-15 rounded-full border-2 lg:border-3 border-[#6F0E18]"
                                        src={user?.photoURL}
                                        alt="profile picture"
                                    />
                                ) : (
                                    <IoPersonCircleOutline
                                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-15 lg:h-15"
                                    />
                                )
                            }
                            <div
                                className={`absolute space-y-3 -right-10 transform -translate-x-1/2 duration-300 ease-in-out transition-all font-semibold bg-[#b49494] text-white rounded-md shadow-lg w-30 p-2 backdrop-blur-lg z-50
                                ${sidebarOpen ? "top-16 md:top-19 lg:top-21 opacity-100 scale-100" : "top-10 opacity-0 scale-90 pointer-events-none"}
                                `}
                            >
                                <p className="text-center">{user?.displayName}</p>
                                <button className=" text-[#460911ca] cursor-pointer" onClick={handleSignOut}>Logout</button>
                            </div>
                        </div>
                    </> : <>
                        <Button className="bg-red-600 text-base px-9 hover:bg-red-800 cursor-pointer">
                            <Link to="/login-user" className="">Login</Link>
                        </Button>
                    </>
                }
            </nav>
        </div>
    );
};

export default NavigationBar;
