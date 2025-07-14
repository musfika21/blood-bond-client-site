import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import useAuth from "../../CustomHooks/useAuth";
import useAxios from "../../CustomHooks/useAxios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";


const MyDonationRequests = () => {
    const { user } = useAuth();
    const axios = useAxios();
    const axiosSecure = useAxios();  //etate pore axios secure hook boshate hobe
    const navigate = useNavigate()

    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [donationRequests, setDonationRequests] = useState([]);


    useEffect(() => {
        if (user?.email) {
            axios
                .get(`/my-donation-requests?email=${user.email}`)
                .then((res) => {
                    setRequests(res.data);
                    setFilteredRequests(res.data);
                })
                .catch((err) => console.error("Error:", err));
        }
    }, [user, axios]);

    useEffect(() => {
        if (statusFilter === "all") {
            setFilteredRequests(requests);
        } else {
            const filtered = requests.filter((req) => req.status === statusFilter);
            setFilteredRequests(filtered);
        }
    }, [statusFilter, requests]);

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
            setSelectedRequest(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await axiosSecure.patch(`/donation-requests/${id}`, { status });
            Swal.fire("Updated!", `Donation marked as ${status}`, "success");
            setDonationRequests((prev) =>
                prev.map((req) => (req._id === id ? { ...req, status } : req))
            );
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Could not update status", "error");
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            await axiosSecure.delete(`/donation-requests/${id}`);
            setDonationRequests((prev) => prev.filter((req) => req._id !== id));
            Swal.fire("Deleted!", "Request has been deleted.", "success");
        }
    };

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
                My Donation Requests
            </h2>

            {/* Filter Buttons */}
            <div className="mb-6 flex flex-wrap gap-2">
                {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-3 md:px-4 py-2 rounded-full border text-sm font-medium transition cursor-pointer ${statusFilter === status
                            ? "bg-red-500 text-white border-red-500 shadow-sm"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded border shadow">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">Recipient Name</th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">Location</th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">Date</th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">Time</th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">Blood Group</th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">Status</th>
                            <th className="px-4 py-3 text-left font-bold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((req) => (
                                <tr key={req._id} className="border-t hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">{req.recipientName}</td>
                                    <td className="px-4 py-3">{req.address}</td>
                                    <td className="px-4 py-3">{req.donationDate}</td>
                                    <td className="px-4 py-3">{req.donationTime}</td>
                                    <td className="px-4 py-3">{req.bloodGroup}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                                            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            {req.status === "inprogress" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleStatusUpdate(req._id, "done")
                                                        }
                                                        title="Mark as Done"
                                                        className="hover:text-green-600"
                                                    >
                                                        ✅
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleStatusUpdate(req._id, "canceled")
                                                        }
                                                        title="Cancel"
                                                        className="hover:text-yellow-600"
                                                    >
                                                        🚫
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => handleView(req._id)}
                                                title="View"

                                                className="hover:text-blue-600"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => navigate(`/edit-donation-request/${req._id}`)}
                                                title="Edit"
                                                className="hover:text-green-600"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(req._id)}
                                                title="Delete"
                                                className="hover:text-red-600"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center px-4 py-6 text-gray-500">
                                    No donation requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Details Modal */}
            {selectedRequest && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-lg w-2/3 max-h-[90vh] overflow-y-auto p-6 md:p-10 relative">
                        <h1 className="text-xl md:text-2xl font-bold mb-4">Donation Request Details</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                ["Requester Name", selectedRequest.requesterName],
                                ["Requester Email", selectedRequest.requesterEmail],
                                ["Recipient Name", selectedRequest.recipientName],
                                ["Recipient District", selectedRequest.recipientDistrict],
                                ["Recipient Upazila", selectedRequest.recipientUpazila],
                                ["Hospital Name", selectedRequest.hospitalName],
                                ["Address", selectedRequest.address],
                                ["Blood Group", selectedRequest.bloodGroup],
                                ["Donation Date", selectedRequest.donationDate],
                                ["Donation Time", selectedRequest.donationTime],
                                ["Request Message", selectedRequest.requestMessage],
                                ["Status", selectedRequest.status],
                                ["Created At", selectedRequest.createdAt],
                            ].map(([label, value], idx) => (
                                <div key={idx} className="flex flex-col border-t pt-4">
                                    <p className="text-gray-500 text-sm">{label}</p>
                                    <p className="text-gray-800 text-sm">{value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setSelectedRequest(null)}
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

export default MyDonationRequests;
