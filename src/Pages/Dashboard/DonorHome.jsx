import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router"; // ✅ react-router-dom holo correct
import { Eye, Pencil, Trash } from "lucide-react";
import useAuth from "../../CustomHooks/useAuth";
import useAxios from "../../CustomHooks/useAxios";
import Swal from "sweetalert2";

import { Button } from "@material-tailwind/react";

const DonorHome = () => {

    const { user, currentUser } = useAuth();
    console.log(currentUser)
    const axiosSecure = useAxios();
    const navigate = useNavigate();
    const [donationRequests, setDonationRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // ✅ Load recent 3 requests
    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/my-recent-donation-requests?email=${user.email}`)
                .then((res) => setDonationRequests(res.data))
                .catch((err) => console.error(err));
        }
    }, [user, axiosSecure]);


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
            const res = await axiosSecure.get(`/donation-requests/${id}`);
            console.log("Fetched:", res.data);
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
        <section className="p-6">
            

            {/* ✅ Table */}
            {donationRequests.length > 0 ? (
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
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {donationRequests.map((req) => (
                                <tr
                                    key={req._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">{req.recipientName}</td>
                                    <td className="px-4 py-3">
                                        {req.recipientDistrict}, {req.recipientUpazila}
                                    </td>
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
                                        <div className="flex items-center gap-3 flex-wrap">
                                            {req.status === "inprogress" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleStatusUpdate(req._id, "done")
                                                        }
                                                        title="Mark as Done"
                                                        className="hover:text-green-600 cursor-pointer"
                                                    >
                                                        ✅
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleStatusUpdate(req._id, "canceled")
                                                        }
                                                        title="Cancel"
                                                        className="hover:text-yellow-600 cursor-pointer"
                                                    >
                                                        🚫
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => handleView(req._id)}
                                                title="View"

                                                className="hover:text-blue-600 cursor-pointer"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => navigate(`/dashboard/update-donation-request/${req._id}`)}
                                                title="Edit"
                                                className="hover:text-green-600 cursor-pointer"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(req._id)}
                                                title="Delete"
                                                className="hover:text-red-600 cursor-pointer"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (<div className="my-40">
                <p className="text-gray-500 text-center mb-3">No recent donation requests found.</p>
                <p className="text-gray-500 text-center">Create Donation <Link to='/dashboard/donation-request' className="text-red-600 underline">here</Link></p>
            </div>
            )}

            {/* Details Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative">
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
                </div>
            )}

            {/* ✅ View All Button */}
            {donationRequests.length > 0 && (
                <div className="mt-7 flex justify-center">
                    <Button
                        onClick={() => navigate("/dashboard/my-donation-requests")}
                        className="px-4 py-2 bg-red-600 text-white"
                    >
                        View All Requests
                    </Button>
                </div>
            )}
        </section>
    );
};

export default DonorHome;