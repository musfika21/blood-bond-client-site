import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../CustomHooks/useAuth";
import useAxios from "../../CustomHooks/useAxios";
import Swal from "sweetalert2";
import { Button } from "@material-tailwind/react";

const Dashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const navigate = useNavigate();
    const [donationRequests, setDonationRequests] = useState([]);

    // Load recent 3 requests by this donor
    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/donation-requests?email=${user.email}&limit=3`)
                .then((res) => setDonationRequests(res.data))
                .catch((err) => console.error(err));
        }
    }, [user, axiosSecure]);

    // Update donation status (done / cancel)
    const handleStatusUpdate = async (id, status) => {
        try {
            await axiosSecure.patch(`/donation-requests/${id}`, { status });
            Swal.fire("Updated!", `Donation marked as ${status}`, "success");
            // Refresh list
            setDonationRequests((prev) =>
                prev.map((req) =>
                    req._id === id ? { ...req, status } : req
                )
            );
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Could not update status", "error");
        }
    };

    // Delete donation request
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/donation-requests/${id}`);
                setDonationRequests((prev) =>
                    prev.filter((req) => req._id !== id)
                );
                Swal.fire("Deleted!", "Donation request deleted.", "success");
            }
        });
    };

    return (
        <section className="p-6">
            {/* Welcome */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-red-600">
                    Welcome, {user?.displayName}!
                </h1>
            </div>

            {/* Donation Requests Table */}
            {donationRequests.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Recipient Name</th>
                                <th className="border p-2">Location</th>
                                <th className="border p-2">Date</th>
                                <th className="border p-2">Time</th>
                                <th className="border p-2">Blood Group</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Donor Info</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donationRequests.map((req) => (
                                <tr key={req._id}>
                                    <td className="border p-2">{req.recipientName}</td>
                                    <td className="border p-2">
                                        {req.recipientDistrict}, {req.recipientUpazila}
                                    </td>
                                    <td className="border p-2">{req.donationDate}</td>
                                    <td className="border p-2">{req.donationTime}</td>
                                    <td className="border p-2">{req.bloodGroup}</td>
                                    <td className="border p-2 capitalize">{req.status}</td>
                                    <td className="border p-2">
                                        {req.status === "inprogress" ? (
                                            <>
                                                {req.donorName} <br />
                                                {req.donorEmail}
                                            </>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="border p-2 flex flex-col gap-2">
                                        {req.status === "inprogress" && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleStatusUpdate(req._id, "done")}
                                                    className="bg-green-600 text-white"
                                                >
                                                    Done
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleStatusUpdate(req._id, "canceled")}
                                                    className="bg-yellow-500 text-white"
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        )}
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                navigate(`/edit-donation-request/${req._id}`)
                                            }
                                            className="bg-blue-600 text-white"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleDelete(req._id)}
                                            className="bg-red-600 text-white"
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                navigate(`/donation-request/${req._id}`)
                                            }
                                            className="bg-gray-700 text-white"
                                        >
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* View All Requests */}
            {donationRequests.length > 0 && (
                <div className="mt-4">
                    <Button
                        onClick={() => navigate("/my-donation-requests")}
                        className="bg-red-600 text-white"
                    >
                        View My All Requests
                    </Button>
                </div>
            )}
        </section>
    );
};

export default Dashboard;
