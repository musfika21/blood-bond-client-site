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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";

const AllUsers = () => {
    const axiosSecure = useAxios();
    const [users, setUsers] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosSecure.get(
                    `/donors?page=${page}&limit=${limit}&status=${statusFilter}`
                );
                setUsers(res.data.users || []);
                setTotal(res.data.total || 0);
            } catch (err) {
                console.error(err);
                setUsers([]);
            }
        };
        fetchUsers();
    }, [page, statusFilter, axiosSecure]);

    const handleBlockToggle = async (id, currentStatus) => {
        const newStatus = currentStatus === "active" ? "blocked" : "active";
        await axiosSecure.patch(`/donors/${id}/status`, { status: newStatus });
        toast.success(
            `User ${newStatus === "active" ? "unblocked" : "blocked"}!`
        );
        setUsers((prev) =>
            prev.map((u) =>
                u._id === id ? { ...u, status: newStatus } : u
            )
        );
    };

    const handleRoleChange = async (id, role) => {
        await axiosSecure.patch(`/donors/${id}/role`, { role });
        toast.success(`Role changed to ${role}`);
        setUsers((prev) =>
            prev.map((u) => (u._id === id ? { ...u, role } : u))
        );
    };

    const totalPages = Math.max(Math.ceil(total / limit), 1);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
                All Users
            </h1>

            {/* Filter */}
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

            {/* Table */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage
                                                src={
                                                    user.avatar ||
                                                    `https://i.pravatar.cc/150?u=${user._id}`
                                                }
                                                alt={user.name}
                                            />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold 
                                                ${user.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : user.status === "blocked"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-full">
                                                <MoreVertical className="w-5 h-5" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {user.status === "active" ? (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleBlockToggle(user._id, user.status)
                                                        }
                                                    >
                                                        <UserX className="w-4 h-4 mr-2" /> Block
                                                    </DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleBlockToggle(user._id, user.status)
                                                        }
                                                    >
                                                        <UserCheck className="w-4 h-4 mr-2" /> Unblock
                                                    </DropdownMenuItem>
                                                )}
                                                {user.role !== "volunteer" && (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleRoleChange(user._id, "volunteer")
                                                        }
                                                    >
                                                        <Users className="w-4 h-4 mr-2" /> Make Volunteer
                                                    </DropdownMenuItem>
                                                )}
                                                {user.role !== "admin" && (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleRoleChange(user._id, "admin")
                                                        }
                                                    >
                                                        <Shield className="w-4 h-4 mr-2" /> Make Admin
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center py-8 text-gray-500"
                                >
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page <= 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() =>
                        setPage((prev) =>
                            prev < totalPages ? prev + 1 : totalPages
                        )
                    }
                    disabled={page >= totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllUsers;