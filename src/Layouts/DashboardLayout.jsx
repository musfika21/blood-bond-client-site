import React, { useState } from "react";
import { Outlet, NavLink, Link, href } from "react-router"; // ✅ router-dom!
import { cn } from "@/lib/utils";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import photo from "../assets/logo.png";
import useAuth from "../CustomHooks/useAuth";

const navItems = [
    { 
        name: "Home", 
        href: "/dashboard" 
    },
    {
        name: "My Donation Requests",
        href: '/dashboard/my-donation-requests'
    }
    
];

const DashboardLayout = () => {

    const { user } = useAuth();
    console.log(user)
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

                <nav className="space-y-2">
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
                <SheetContent side="left" className="w-64 p-6">
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
                </SheetContent>
            </Sheet>

            {/* Main Content + Outlet */}
            <main className="flex-1 bg-gray-50">
                {/* Top Navbar */}
                <div className="hidden bg-red-50 p-3 md:flex justify-end items-center mb-6">
                    <div className="h-10 w-10 rounded-full">
                        <img className="object-cover rounded-lg" src={user.photoURL} alt="" />
                    </div>
                </div>

                {/* Nested Routes Render Here */}
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
