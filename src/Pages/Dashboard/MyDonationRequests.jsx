import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import useAuth from "../../CustomHooks/useAuth";
import useAxios from "../../CustomHooks/useAxios";

const MyDonationRequests = () => {
    const { user } = useAuth();
    const axios = useAxios();

    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedRequest, setSelectedRequest] = useState(null);

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

    const handleDelete = async (id) => {
        const confirm = window.confirm(
            "Are you sure you want to delete this request?"
        );
        if (!confirm) return;

        try {
            await axios.delete(`/donation-requests/${id}`);
            setRequests((prev) => prev.filter((req) => req._id !== id));
            alert("Deleted successfully!");
        } catch (error) {
            console.error(error);
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

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>

            {/* Filter Buttons */}
            <div className="mb-6 flex gap-2 flex-wrap">
                {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition cursor-pointer ${statusFilter === status
                                ? "bg-red-500 text-white border-red-500 shadow-sm"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border shadow">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left font-extrabold text-gray-600">
                                Recipient Name
                            </th>
                            <th className="px-6 py-3 text-left font-extrabold text-gray-600">
                                Recipient Location
                            </th>
                            <th className="px-6 py-3 text-left font-extrabold text-gray-600">
                                Donation Date
                            </th>
                            <th className="px-6 py-3 text-left font-extrabold text-gray-600">
                                Donation Time
                            </th>
                            <th className="px-6 py-3 text-left font-extrabold text-gray-600">
                                Blood Group
                            </th>
                            <th className="px-6 py-3 text-left font-extrabold text-gray-600">
                                Donation Status
                            </th>
                            <th className="px-6 py-3 text-left font-extrabold text-gray-600">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((req) => (
                                <tr
                                    key={req._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 text-gray-800">
                                        {req.recipientName}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">{req.address}</td>
                                    <td className="px-6 py-4 text-gray-800">
                                        {req.donationDate}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                        {req.donationTime}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">{req.bloodGroup}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                req.status
                                            )}`}
                                        >
                                            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3 text-gray-500">
                                            <button
                                                title="View"
                                                onClick={() => handleView(req._id)}
                                                className="hover:text-blue-600 cursor-pointer"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
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
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    No donation requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Details Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
                    <div className="bg-white rounded-lg py-10 px-20 w-2/3 overflow-y-auto max-h-[90vh]">
                        <h3 className="text-xl font-bold">Donation Request Details</h3>
                        <div className="border-b-2 my-4"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold text-gray-600">Requester Name</p>
                                <p>{selectedRequest.requesterName}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">Requester Email</p>
                                <p>{selectedRequest.requesterEmail}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">Recipient Name</p>
                                <p>{selectedRequest.recipientName}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">
                                    Recipient District
                                </p>
                                <p>{selectedRequest.recipientDistrict}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">
                                    Recipient Upazila
                                </p>
                                <p>{selectedRequest.recipientUpazila}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">Hospital Name</p>
                                <p>{selectedRequest.hospitalName}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="font-semibold text-gray-600">Address</p>
                                <p>{selectedRequest.address}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">Blood Group</p>
                                <p>{selectedRequest.bloodGroup}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">Donation Date</p>
                                <p>{selectedRequest.donationDate}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">Donation Time</p>
                                <p>{selectedRequest.donationTime}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="font-semibold text-gray-600">Request Message</p>
                                <p>{selectedRequest.requestMessage}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">Status</p>
                                <p>{selectedRequest.status}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">Created At</p>
                                <p>{selectedRequest.createdAt}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedRequest(null)}
                            className="mt-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyDonationRequests;
