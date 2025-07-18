import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import useAxios from "../../CustomHooks/useAxios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { MoreVertical } from "lucide-react";
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
import useAuth from "../../CustomHooks/useAuth";
import { useLocation } from "react-router";

const AllDonations = () => {
    const axios = useAxios();
    const axiosSecure = useAxios();
    const { currentUser } = useAuth();
    // console.log(user)

    const [donations, setDonations] = useState([]);
    const [filteredDonations, setFilteredDonations] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedDonation, setSelectedDonation] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 6;
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/dashboard/all-donations") {
            window.document.title = "All Donation Requests | Blood Bond";
        }
    }, [location.pathname]);

    useEffect(() => {
        axios
            .get(`/all-donation-requests?page=${currentPage}&limit=${limit}`)
            .then((res) => {
                setDonations(res.data.data);
                setTotalCount(res.data.count);
            })
            .catch((err) => console.error(err));
    }, [axios, currentPage]);

    useEffect(() => {
        if (statusFilter === "all") {
            setFilteredDonations(donations);
        } else {
            const filtered = donations.filter((req) => req.status === statusFilter);
            setFilteredDonations(filtered);
        }
    }, [statusFilter, donations]);

    const getStatusColor = (status) => {
        switch (status) {
            case "done":
            case "completed":
                return "bg-green-100 text-green-700";
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "inprogress":
                return "bg-blue-100 text-blue-700";
            case "canceled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-200 text-gray-700";
        }
    };

    const handleView = async (id) => {
        try {
            const res = await axios.get(`/donation-requests/${id}`);
            setSelectedDonation(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await axiosSecure.patch(`/donation-requests/${id}`, { status });
            Swal.fire("Updated!", `Donation marked as ${status}`, "success");

            const updated = donations.map((req) =>
                req._id === id ? { ...req, status } : req
            );
            setDonations(updated);
            if (statusFilter === "all") {
                setFilteredDonations(updated);
            } else {
                setFilteredDonations(
                    updated.filter((req) => req.status === statusFilter)
                );
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Could not update status", "error");
        }
    };

    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
                All Donation Requests
            </h2>

            <div className="mb-6">
                <DropdownMenu>
                    <DropdownMenuTrigger className="px-4 py-2 border rounded-md bg-white text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer">
                        Filter: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {["all", "pending", "inprogress", "done", "canceled"].map(
                            (status) => (
                                <DropdownMenuItem
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`cursor-pointer ${statusFilter === status ? "font-bold text-red-500" : ""
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </DropdownMenuItem>
                            )
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="overflow-x-auto rounded border shadow">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">
                                Recipient
                            </th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">
                                Location
                            </th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">
                                Date
                            </th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">
                                Time
                            </th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">
                                Blood Group
                            </th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">
                                Details
                            </th>
                            {
                                currentUser?.role === 'admin' &&
                                <th className="px-4 py-3 text-left font-bold text-gray-600">
                                    Actions
                                </th>
                            }
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filteredDonations.length > 0 ? (
                            filteredDonations.map((req) => (
                                <tr
                                    key={req._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">{req.recipientName}</td>
                                    <td className="px-4 py-3">{req.address}</td>
                                    <td className="px-4 py-3">{req.donationDate}</td>
                                    <td className="px-4 py-3">{req.donationTime}</td>
                                    <td className="px-4 py-3">{req.bloodGroup}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                req.status
                                            )}`}
                                        >
                                            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleView(req._id)}
                                            title="View"
                                            className="hover:text-blue-600 cursor-pointer"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                    {/* actions only for admin */}
                                    {
                                        currentUser?.role === 'admin' &&
                                        <td className="px-4 py-3">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
                                                    <MoreVertical size={18} />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem
                                                        onClick={() => handleStatusUpdate(req._id, "inprogress")}
                                                        className="flex items-center gap-2 cursor-pointer"
                                                    >
                                                        🕒 Inprogress
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleStatusUpdate(req._id, "done")}
                                                        className="flex items-center gap-2 cursor-pointer"
                                                    >
                                                        ✅ Done
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleStatusUpdate(req._id, "canceled")}
                                                        className="flex items-center gap-2 cursor-pointer"
                                                    >
                                                        🚫 Cancel
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    }

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={currentUser?.role === 'admin' ? 8 : 7} className="text-center px-4 py-6 text-gray-500">
                                    No donation requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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
                                className={
                                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                                }
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
                                className={
                                    currentPage === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}

            {selectedDonation && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                >
                    <div className="bg-white rounded-lg w-2/3 max-h-[90vh] overflow-y-auto p-6 md:p-10 relative">
                        <h1 className="text-xl md:text-2xl font-bold mb-4">
                            Donation Request Details
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                ["Requester Name", selectedDonation.requesterName],
                                ["Requester Email", selectedDonation.requesterEmail],
                                ["Recipient Name", selectedDonation.recipientName],
                                ["Recipient District", selectedDonation.recipientDistrict],
                                ["Recipient Upazila", selectedDonation.recipientUpazila],
                                ["Hospital Name", selectedDonation.hospitalName],
                                ["Address", selectedDonation.address],
                                ["Blood Group", selectedDonation.bloodGroup],
                                ["Donation Date", selectedDonation.donationDate],
                                ["Donation Time", selectedDonation.donationTime],
                                ["Request Message", selectedDonation.requestMessage],
                                ["Status", selectedDonation.status],
                                ["Created At", selectedDonation.createdAt],
                            ].map(([label, value], idx) => (
                                <div key={idx} className="flex flex-col border-t pt-4">
                                    <p className="text-gray-500 text-sm">{label}</p>
                                    <p className="text-gray-800 text-sm">{value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setSelectedDonation(null)}
                                className="px-5 py-2 bg-gray-200 rounded-lg text-gray-700 font-semibold cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AllDonations;
