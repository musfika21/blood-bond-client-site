import React, { useEffect, useState } from "react";
import useAxios from "../../CustomHooks/useAxios";
import {
    MoreVertical,
    UserCheck,
    UserX,
    Shield,
    Users,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/ui/pagination";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";

const AllUsers = () => {
    const axiosSecure = useAxios();
    const [users, setUsers] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosSecure.get(
                    `/donors?page=${currentPage}&limit=${limit}&status=${statusFilter}`
                );
                setUsers(res.data.users || []);
                setTotalCount(res.data.total || 0);
            } catch (err) {
                console.error(err);
                setUsers([]);
            }
        };
        fetchUsers();
    }, [currentPage, statusFilter, axiosSecure]);

    const handleBlockToggle = async (id, currentStatus) => {
        const newStatus = currentStatus === "active" ? "blocked" : "active";
        await axiosSecure.patch(`/donors/${id}/status`, { status: newStatus });
        toast.success(`User ${newStatus === "active" ? "unblocked" : "blocked"}!`);
        setUsers((prev) =>
            prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
        );
    };

    const handleRoleChange = async (id, role) => {
        await axiosSecure.patch(`/donors/${id}/role`, { role });
        toast.success(`Role changed to ${role}`);
        setUsers((prev) =>
            prev.map((u) => (u._id === id ? { ...u, role } : u))
        );
    };

    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                All Users
            </h1>

            {/* ✅ Filter Dropdown */}
            <div className="mb-6">
                <DropdownMenu>
                    <DropdownMenuTrigger className="px-4 py-2 border rounded-md bg-white text-gray-700 shadow-sm hover:bg-gray-50">
                        Status: {statusFilter ? statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1) : "All"}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {["", "active", "blocked"].map((status) => (
                            <DropdownMenuItem
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`cursor-pointer ${statusFilter === status ? "font-bold text-red-600" : ""}`}
                            >
                                {status ? status.charAt(0).toUpperCase() + status.slice(1) : "All"}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* ✅ Table */}
            <div className="overflow-x-auto rounded border shadow">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">Avatar</th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">Name</th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">Email</th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">Role</th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">Status</th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id} className="border-t hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage
                                                src={user.avatar || `https://i.pravatar.cc/150?u=${user._id}`}
                                                alt={user.name}
                                            />
                                        </Avatar>
                                    </td>
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3 capitalize">{user.role}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                user.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : user.status === "blocked"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-gray-200 text-gray-700"
                                            }`}
                                        >
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-full">
                                                <MoreVertical className="w-5 h-5" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {user.status === "active" ? (
                                                    <DropdownMenuItem
                                                        onClick={() => handleBlockToggle(user._id, user.status)}
                                                    >
                                                        <UserX className="w-4 h-4 mr-2" /> Block
                                                    </DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem
                                                        onClick={() => handleBlockToggle(user._id, user.status)}
                                                    >
                                                        <UserCheck className="w-4 h-4 mr-2" /> Unblock
                                                    </DropdownMenuItem>
                                                )}
                                                {user.role !== "volunteer" && (
                                                    <DropdownMenuItem
                                                        onClick={() => handleRoleChange(user._id, "volunteer")}
                                                    >
                                                        <Users className="w-4 h-4 mr-2" /> Make Volunteer
                                                    </DropdownMenuItem>
                                                )}
                                                {user.role !== "admin" && (
                                                    <DropdownMenuItem
                                                        onClick={() => handleRoleChange(user._id, "admin")}
                                                    >
                                                        <Shield className="w-4 h-4 mr-2" /> Make Admin
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center px-4 py-6 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Pagination */}
            {totalPages > 1 && (
                <Pagination className="mt-8 flex justify-center">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                                }}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>

                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === index + 1}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(index + 1);
                                    }}
                                    className="data-[active=true]:bg-red-500 data-[active=true]:text-white"
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                }}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default AllUsers;
