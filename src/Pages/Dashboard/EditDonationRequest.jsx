import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxios from "../../CustomHooks/useAxios";
import Swal from "sweetalert2";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axiosSecure.get(`/donation-requests/${id}`).then((res) => {
      setFormData(res.data);
    });
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/donation-requests/${id}`, formData);
      Swal.fire("Updated!", "Donation request updated successfully!", "success");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <section className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Donation Request</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          type="text"
          name="recipientName"
          placeholder="Recipient Name"
          value={formData.recipientName || ""}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2"
          type="text"
          name="recipientDistrict"
          placeholder="Recipient District"
          value={formData.recipientDistrict || ""}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2"
          type="text"
          name="recipientUpazila"
          placeholder="Recipient Upazila"
          value={formData.recipientUpazila || ""}
          onChange={handleChange}
          required
        />
        {/* Add other fields like hospitalName, address, donationDate, time, etc. */}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Update Request
        </button>
      </form>
    </section>
  );
};

export default EditDonationRequest;
