import React from 'react';
import useAuth from '../../CustomHooks/useAuth';

const Register = () => {
    
    const {theme} = useAuth()

    return (
        <div className="relative flex size-full min-h-screen flex-col dark:bg-[#121516] dark group/design-root overflow-x-hidden"
            style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                        <h2 className="text-white tracking-tight text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
                            Create your account
                        </h2>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">Email</p>
                                <input
                                    placeholder="Enter your email"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#40494f] bg-[#1e2224] focus:border-[#40494f] h-14 placeholder:text-[#a2adb3] p-[15px] text-base font-normal leading-normal"
                                />
                            </label>
                        </div>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">Name</p>
                                <input
                                    placeholder="Enter your name"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#40494f] bg-[#1e2224] focus:border-[#40494f] h-14 placeholder:text-[#a2adb3] p-[15px] text-base font-normal leading-normal"
                                />
                            </label>
                        </div>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">Blood Group</p>
                                <select
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#40494f] bg-[#1e2224] focus:border-[#40494f] h-14 bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(162,173,179)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')] placeholder:text-[#a2adb3] p-[15px] text-base font-normal leading-normal"
                                >
                                    <option value="one">Select your blood group</option>
                                    <option value="two">two</option>
                                    <option value="three">three</option>
                                </select>
                            </label>
                        </div>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">District</p>
                                <select
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#40494f] bg-[#1e2224] focus:border-[#40494f] h-14 bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(162,173,179)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')] placeholder:text-[#a2adb3] p-[15px] text-base font-normal leading-normal"
                                >
                                    <option value="one">Select your district</option>
                                    <option value="two">two</option>
                                    <option value="three">three</option>
                                </select>
                            </label>
                        </div>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">Upazila</p>
                                <select
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#40494f] bg-[#1e2224] focus:border-[#40494f] h-14 bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(162,173,179)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')] placeholder:text-[#a2adb3] p-[15px] text-base font-normal leading-normal"
                                >
                                    <option value="one">Select your upazila</option>
                                    <option value="two">two</option>
                                    <option value="three">three</option>
                                </select>
                            </label>
                        </div>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">Password</p>
                                <input
                                    placeholder="Enter your password"
                                    type="password"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#40494f] bg-[#1e2224] focus:border-[#40494f] h-14 placeholder:text-[#a2adb3] p-[15px] text-base font-normal leading-normal"
                                />
                            </label>
                        </div>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">Confirm Password</p>
                                <input
                                    placeholder="Confirm your password"
                                    type="password"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#40494f] bg-[#1e2224] focus:border-[#40494f] h-14 placeholder:text-[#a2adb3] p-[15px] text-base font-normal leading-normal"
                                />
                            </label>
                        </div>
                        <div className="flex px-4 py-3">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#b2d1e5] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em]"
                            >
                                <span className="truncate">Register</span>
                            </button>
                        </div>
                        <p className="text-[#a2adb3] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
                            Already have an account? Login
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;