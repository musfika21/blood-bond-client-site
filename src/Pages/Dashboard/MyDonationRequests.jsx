import React, { useEffect, useState } from "react";
import useAxios from "../../CustomHooks/useAxios";
import Swal from "sweetalert2";
import { Button } from "@material-tailwind/react";

const MyDonationRequests = () => {
    const axiosSecure = useAxios();
    const [requests, setRequests] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const userEmail = "yourLoggedInUserEmail@example.com"; // TODO: replace with auth context value

    const fetchRequests = async () => {
        try {
            const res = await axiosSecure.get(
                `/donation-requests/all?email=${userEmail}&status=${statusFilter}&page=${page}&limit=${limit}`
            );
            setRequests(res.data.requests);
            setTotalPages(Math.ceil(res.data.total / limit));
        } catch (err) {
            console.error("Error fetching requests:", err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [statusFilter, page]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/donation-requests/${id}/status`, { status: newStatus });
            Swal.fire("Updated!", "Donation status updated.", "success");
            fetchRequests();
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Something went wrong.", "error");
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
        });
        if (confirm.isConfirmed) {
            await axiosSecure.delete(`/donation-requests/${id}`);
            Swal.fire("Deleted!", "Donation request deleted.", "success");
            fetchRequests();
        }
    };

    return (
        <section className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-red-600">My Donation Requests</h1>

            {/* Filter */}
            <div className="mb-4">
                <label>Status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setPage(1); // reset to page 1 on filter change
                        setStatusFilter(e.target.value);
                    }}
                    className="border px-4 py-2 rounded ml-2"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">Recipient</th>
                            <th className="border px-4 py-2">Location</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Time</th>
                            <th className="border px-4 py-2">Blood Group</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id}>
                                <td className="border px-4 py-2">{req.recipientName}</td>
                                <td className="border px-4 py-2">
                                    {req.recipientDistrict}, {req.recipientUpazila}
                                </td>
                                <td className="border px-4 py-2">{req.donationDate}</td>
                                <td className="border px-4 py-2">{req.donationTime}</td>
                                <td className="border px-4 py-2">{req.bloodGroup}</td>
                                <td className="border px-4 py-2 capitalize">{req.status}</td>
                                <td className="border px-4 py-2 space-x-2">
                                    {/* Status Update */}
                                    {req.status === "inprogress" && (
                                        <>
                                            <Button
                                                size="sm"
                                                color="green"
                                                onClick={() => handleStatusChange(req._id, "done")}
                                            >
                                                Done
                                            </Button>
                                            <Button
                                                size="sm"
                                                color="red"
                                                onClick={() => handleStatusChange(req._id, "canceled")}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    )}

                                    {/* Edit */}
                                    <Button size="sm" color="blue">
                                        Edit
                                    </Button>

                                    {/* View */}
                                    <Button size="sm" color="gray">
                                        View
                                    </Button>

                                    {/* Delete */}
                                    <Button
                                        size="sm"
                                        color="red"
                                        onClick={() => handleDelete(req._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    No donation requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                >
                    Previous
                </Button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <Button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                >
                    Next
                </Button>
            </div>
        </section>
    );
};

export default MyDonationRequests;
