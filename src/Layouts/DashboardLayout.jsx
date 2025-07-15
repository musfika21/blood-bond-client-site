import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router";
import { cn } from "@/lib/utils";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import photo from "../assets/logo.png";
import useAuth from "../CustomHooks/useAuth";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

// ✅ 1️⃣ Role based nav config
const NAV_ITEMS = {
    donor: [
        { name: "Home", href: "/dashboard/home" },
        { name: "Create Donation Request", href: "/dashboard/donation-request" },
        { name: "My Donation Requests", href: "/dashboard/my-donation-requests" },
        { name: "Profile", href: "/dashboard/profile" },
    ],
    admin: [
        { name: "Home", href: "/dashboard/home" },
        { name: "All Users", href: "/dashboard/all-users" },
        { name: "Manage Donations", href: "/dashboard/manage-donations" },
        { name: "Profile", href: "/dashboard/profile" },
    ],
};

const DashboardLayout = () => {
    const { user, currentUser, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // ✅ 2️⃣ Role থেকে navItems বের করো
    const role = currentUser?.role || 'donor'; // fallback role
    const navItems = NAV_ITEMS[role] || [];

    const handleLogout = () => {
        Swal.fire({
            title: "Logout Successful",
            icon: "success",
            draggable: true,
        });
        logout();
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar - Desktop */}
            <aside
                className={cn(
                    "hidden md:flex w-64 flex-col bg-white border-r border-gray-200 px-4 py-6"
                )}
            >
                <Link to='/'>
                    <div className="flex items-center gap-2 mb-6">
                        <img
                            src={photo}
                            alt="Blood Bond"
                            className="h-10 w-auto object-contain"
                        />
                        <h2 className="text-xl font-bold">
                            <span className="text-red-600">B</span>lood Bond
                        </h2>
                    </div>
                </Link>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                cn(
                                    "block px-3 py-2 rounded-md",
                                    isActive
                                        ? "bg-red-100 text-red-600 font-semibold"
                                        : "text-gray-700 hover:bg-gray-100"
                                )
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md mt-6 cursor-pointer"
                >
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* Sidebar - Mobile */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden fixed top-4 left-4 z-50 text-black"
                    >
                        {sidebarOpen ? <X /> : <Menu />}
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <img
                                src={photo}
                                alt="Blood Bond"
                                className="h-10 w-auto object-contain"
                            />
                            <h2 className="text-xl font-bold">
                                <span className="text-red-600">B</span>lood Bond
                            </h2>
                        </div>

                        <nav className="space-y-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        cn(
                                            "block px-3 py-2 rounded-md",
                                            isActive
                                                ? "bg-red-100 text-red-600 font-semibold"
                                                : "text-gray-700 hover:bg-gray-100"
                                        )
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    <button
                        onClick={() => {
                            handleLogout();
                            setSidebarOpen(false);
                        }}
                        className="flex items-center gap-2 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </SheetContent>
            </Sheet>

            {/* Main Content + Outlet */}
            <main className="flex-1 bg-gray-50">
                {/* Top Navbar */}
                <div className="hidden md:flex justify-end items-center bg-red-50 px-6 py-3">
                    <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-gray-700">
                            {currentUser?.name || "User"}
                        </div>
                        <img
                            className="h-13 w-13 rounded-full object-cover ring-2 ring-red-400 shadow-sm transition duration-200 hover:ring-red-700 cursor-pointer"
                            src={currentUser?.avatar || photo}
                            alt="Profile"
                        />
                    </div>
                </div>
                <Outlet />
                <Toaster />
            </main>
        </div>
    );
};

export default DashboardLayout;
