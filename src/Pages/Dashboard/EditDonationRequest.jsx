import React, { useEffect, useState } from "react";
import useAuth from "../../CustomHooks/useAuth";
import useAxios from "../../CustomHooks/useAxios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const EditDonationRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setValue } = useForm();
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState("");

    useEffect(() => {
        axiosSecure.get("/districts").then((res) => setDistricts(res.data));
    }, [axiosSecure]);

    useEffect(() => {
        if (selectedDistrictId) {
            axiosSecure.get(`/upazillas/${selectedDistrictId}`).then((res) => setUpazillas(res.data));
        } else {
            setUpazillas([]);
        }
    }, [selectedDistrictId, axiosSecure]);

    useEffect(() => {
        if (id) {
            axiosSecure.get(`/donation-requests/${id}`).then((res) => {
                const data = res.data;

                setValue("requesterName", data.requesterName);
                setValue("requesterEmail", data.requesterEmail);
                setValue("recipientName", data.recipientName);
                setValue("recipientDistrict", districts.find(d => d.name === data.recipientDistrict)?.id || "");
                setSelectedDistrictId(districts.find(d => d.name === data.recipientDistrict)?.id || "");
                setValue("recipientUpazila", upazillas.find(u => u.name === data.recipientUpazila)?.id || "");
                setValue("hospitalName", data.hospitalName);
                setValue("address", data.address);
                setValue("bloodGroup", data.bloodGroup);
                setValue("donationDate", data.donationDate);
                setValue("donationTime", data.donationTime);
                setValue("requestMessage", data.requestMessage);
            });
        }
    }, [id, axiosSecure, setValue, districts, upazillas]);

    const onSubmit = async (data) => {
        const updatedRequest = {
            recipientName: data.recipientName,
            recipientDistrict: districts.find(d => d.id === data.recipientDistrict)?.name || "",
            recipientUpazila: upazillas.find(u => u.id === data.recipientUpazila)?.name || "",
            hospitalName: data.hospitalName,
            address: data.address,
            bloodGroup: data.bloodGroup,
            donationDate: data.donationDate,
            donationTime: data.donationTime,
            requestMessage: data.requestMessage,
        };

        try {
            const res = await axiosSecure.patch(`/donation-requests/${id}`, updatedRequest);
            if (res.data.modifiedCount > 0) {
                toast.success("Donation request updated!");
                navigate("/dashboard/my-donation-requests");
            } else {
                toast.error("Update failed. Try again!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error updating request!");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white rounded shadow">
            <Toaster position="top-center" />
            <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Edit Donation Request</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="block mb-1">Requester Name</label>
                    <input
                        {...register("requesterName")}
                        type="text"
                        readOnly
                        className="w-full border px-4 py-2 rounded bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block mb-1">Requester Email</label>
                    <input
                        {...register("requesterEmail")}
                        type="email"
                        readOnly
                        className="w-full border px-4 py-2 rounded bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block mb-1">Recipient Name</label>
                    <input
                        {...register("recipientName", { required: true })}
                        type="text"
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1">Recipient District</label>
                    <select
                        {...register("recipientDistrict", { required: true })}
                        onChange={(e) => {
                            setSelectedDistrictId(e.target.value);
                            setValue("recipientUpazila", "");
                        }}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="">Select District</option>
                        {districts.map((d) => (
                            <option key={d._id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Recipient Upazila</label>
                    <select
                        {...register("recipientUpazila", { required: true })}
                        disabled={!selectedDistrictId}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="">Select Upazila</option>
                        {upazillas.map((u) => (
                            <option key={u._id} value={u.id}>{u.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Hospital Name</label>
                    <input
                        {...register("hospitalName", { required: true })}
                        type="text"
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 md:col-span-2">
                    <div>
                        <label className="block mb-1">Blood Group</label>
                        <select
                            {...register("bloodGroup", { required: true })}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="">Select Blood Group</option>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1">Donation Date</label>
                        <input
                            {...register("donationDate", { required: true })}
                            type="date"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Donation Time</label>
                        <input
                            {...register("donationTime", { required: true })}
                            type="time"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-1">Full Address</label>
                    <input
                        {...register("address", { required: true })}
                        type="text"
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-1">Request Message</label>
                    <textarea
                        {...register("requestMessage", { required: true })}
                        rows={4}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    ></textarea>
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-800"
                    >
                        Update Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditDonationRequest;
