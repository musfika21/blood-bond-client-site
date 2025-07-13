import React, { useEffect, useState } from "react";
import useAuth from "../../CustomHooks/useAuth";
import useAxios from "../../CustomHooks/useAxios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const CreateDonationRequest = () => {
    const { user, currentUser } = useAuth();
    const axiosSecure = useAxios();
    const { register, handleSubmit, reset, setValue } = useForm();

    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState("");

    // ✅ Load districts initially
    useEffect(() => {
        axiosSecure.get("/districts").then(res => setDistricts(res.data));
    }, [axiosSecure]);

    // ✅ Load upazillas when district changes
    useEffect(() => {
        if (selectedDistrictId) {
            axiosSecure.get(`/upazillas/${selectedDistrictId}`).then(res => setUpazillas(res.data));
        } else {
            setUpazillas([]);
        }
    }, [selectedDistrictId, axiosSecure]);

    // ✅ Pre-fill requester name & email
    useEffect(() => {
        if (user) {
            setValue("requesterName", user.displayName || "");
            setValue("requesterEmail", user.email || "");
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        if (currentUser?.status === "blocked") {
            toast.error("You are blocked and cannot create donation requests!");
            return;
        }

        const donationRequest = {
            requesterName: data.requesterName,
            requesterEmail: data.requesterEmail,
            recipientName: data.recipientName,
            recipientDistrict: districts.find(d => d.id === data.recipientDistrict)?.name || "",
            recipientUpazila: upazillas.find(u => u.id === data.recipientUpazila)?.name || "",
            hospitalName: data.hospitalName,
            address: data.address,
            bloodGroup: data.bloodGroup,
            donationDate: data.donationDate,
            donationTime: data.donationTime,
            requestMessage: data.requestMessage,
            status: "pending",
            createdAt: new Date(),
        };


        try {
            const res = await axiosSecure.post("/donation-requests", donationRequest);
            if (res.data.insertedId) {
                toast.success("Donation request created successfully!");
                reset();
                setSelectedDistrictId("");
                setUpazillas([]);
            } else {
                toast.error("Something went wrong. Please try again!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to create donation request!");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white rounded shadow">
            <Toaster position="top-center" />
            <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Create Donation Request</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Requester Name */}
                <div>
                    <label className="block mb-1">Requester Name</label>
                    <input
                        {...register("requesterName")}
                        type="text"
                        readOnly
                        defaultValue={user.displayName}
                        className="w-full border px-4 py-2 rounded bg-gray-100"
                    />
                </div>

                {/* Requester Email */}
                <div>
                    <label className="block mb-1">Requester Email</label>
                    <input
                        {...register("requesterEmail")}
                        type="email"
                        readOnly
                        defaultValue={user.email}
                        className="w-full border px-4 py-2 rounded bg-gray-100"
                    />
                </div>

                {/* Recipient Name */}
                <div>
                    <label className="block mb-1">Recipient Name</label>
                    <input
                        {...register("recipientName", { required: true })}
                        type="text"
                        placeholder="Recipient full name"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                    />
                </div>

                {/* District */}
                <div>
                    <label className="block mb-1">Recipient District</label>
                    <select
                        {...register("recipientDistrict", { required: true })}
                        onChange={(e) => {
                            setSelectedDistrictId(e.target.value);
                            // Reset upazila when district changes
                            setValue("recipientUpazila", "");
                        }}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                    >
                        <option value="">Select District</option>
                        {districts.map(d => (
                            <option key={d._id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                </div>

                {/* Upazila */}
                <div>
                    <label className="block mb-1">Recipient Upazila</label>
                    <select
                        {...register("recipientUpazila", { required: true })}
                        disabled={!selectedDistrictId}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                    >
                        <option value="">Select Upazila</option>
                        {upazillas.map(u => (
                            <option key={u._id} value={u.id}>{u.name}</option>
                        ))}
                    </select>
                </div>

                {/* Hospital */}
                <div>
                    <label className="block mb-1">Hospital Name</label>
                    <input
                        {...register("hospitalName", { required: true })}
                        type="text"
                        placeholder="E.g., Dhaka Medical College"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 md:col-span-2">
                    {/* Blood Group */}
                    <div>
                        <label className="block mb-1">Blood Group</label>
                        <select
                            {...register("bloodGroup", { required: true })}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                        >
                            <option value="">Select Blood Group</option>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                    </div>

                    {/* Donation Date */}
                    <div>
                        <label className="block mb-1">Donation Date</label>
                        <input
                            {...register("donationDate", { required: true })}
                            type="date"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                        />
                    </div>

                    {/* Donation Time */}
                    <div>
                        <label className="block mb-1">Donation Time</label>
                        <input
                            {...register("donationTime", { required: true })}
                            type="time"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                        />
                    </div>
                </div>

                {/* Full Address */}
                <div className="md:col-span-2">
                    <label className="block mb-1">Full Address</label>
                    <input
                        {...register("address", { required: true })}
                        type="text"
                        placeholder="e.g., Zahir Raihan Rd, Dhaka"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                    />
                </div>

                {/* Request Message */}
                <div className="md:col-span-2">
                    <label className="block mb-1">Request Message</label>
                    <textarea
                        {...register("requestMessage", { required: true })}
                        rows={4}
                        placeholder="Explain why you need blood in detail..."
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    {currentUser?.status === "blocked" ? (
                        <p className="text-red-600">You are blocked. Cannot create request.</p>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-800 cursor-pointer"
                        >
                            Request
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateDonationRequest;
