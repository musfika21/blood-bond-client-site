import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import useAuth from "../../CustomHooks/useAuth";
import useAxios from "../../CustomHooks/useAxios";
import Swal from "sweetalert2";
import Loader from "../../shared/Loader";
import { Button } from "@material-tailwind/react";

const ProfilePage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");

    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);

    const [selectedDistrictId, setSelectedDistrictId] = useState("");
    const [selectedDistrictName, setSelectedDistrictName] = useState("");
    const [selectedUpazillaId, setSelectedUpazillaId] = useState("");
    const [selectedUpazillaName, setSelectedUpazillaName] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        avatar: "",
        bloodGroup: "",
    });

    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    // Fetch districts once
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const res = await axiosSecure.get("/districts");
                setDistricts(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load districts");
            }
        };
        fetchDistricts();
    }, [axiosSecure]);

    // Fetch user profile after districts are loaded
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.email || !districts.length) return;
            setLoading(true);
            try {
                const res = await axiosSecure.get(`/donors/${user.email}`);
                const data = res.data;
                const matchedDistrict = districts.find(
                    (d) => d.id === data.districtId || d.name === data.districtName
                );
                const districtId = matchedDistrict?.id || "";
                const districtName = matchedDistrict?.name || "";

                const matchedUpazilla = data.upazillaId
                    ? null
                    : null;

                setSelectedDistrictId(districtId);
                setSelectedDistrictName(districtName);

                setSelectedUpazillaId(data.upazillaId || "");
                setSelectedUpazillaName(data.upazillaName || "");

                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    avatar: data.avatar || "",
                    bloodGroup: data.bloodGroup || "",
                });

                if (districtId) {
                    const upazillaRes = await axiosSecure.get(`/upazillas/${districtId}`);
                    setUpazillas(upazillaRes.data);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user?.email, districts, axiosSecure]);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;

        if (name === "district") {
            const found = districts.find((d) => d.id === value);
            setSelectedDistrictId(value);
            setSelectedDistrictName(found?.name || "");

            if (value) {
                try {
                    const res = await axiosSecure.get(`/upazillas/${value}`);
                    setUpazillas(res.data);
                } catch (err) {
                    console.error("Failed to load upazillas", err);
                    setUpazillas([]);
                }
            } else {
                setUpazillas([]);
            }

            setSelectedUpazillaId("");
            setSelectedUpazillaName("");
        } else if (name === "upazilla") {
            const found = upazillas.find((u) => u.id === value);
            setSelectedUpazillaId(value);
            setSelectedUpazillaName(found?.name || "");
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async () => {
        if (!user?.email) return;

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to save these changes?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Save",
        });

        if (!confirm.isConfirmed) return;

        setSaving(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("bloodGroup", formData.bloodGroup);
            formDataToSend.append("districtId", selectedDistrictId);
            formDataToSend.append("districtName", selectedDistrictName);
            formDataToSend.append("upazillaId", selectedUpazillaId);
            formDataToSend.append("upazillaName", selectedUpazillaName);
            if (selectedFile) {
                formDataToSend.append("avatar", selectedFile);
            }

            const res = await axiosSecure.patch(`/donors/${user.email}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire("Success!", "Profile Updated!", "success");
                setIsEditing(false);
            } else {
                Swal.fire("Info", "No changes were made.", "info");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Update failed.", "error");
        } finally {
            setSaving(false);
        }
    };

    // Image handler
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };


    if (loading)
        return (
            <Loader />
        );

    return (
        <div className="max-w-2xl mx-auto p-6 mt-10">
            <h3 className="text-lg font-bold mb-4">Your Profile</h3>
            <div className="flex flex-col gap-6 items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {formData.avatar ? (
                        <img
                            src={formData.avatar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User className="w-12 h-12 text-gray-500" />
                    )}
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-1">{formData.name}</h2>
                    <p className="text-sm text-gray-700">Blood: {formData.bloodGroup}</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label>Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className="w-full border rounded px-4 py-2"
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        value={formData.email}
                        disabled
                        className="w-full border rounded px-4 py-2 bg-gray-100"
                    />
                </div>

                <div>
                    <label>Avatar</label>
                    <input
                        type="file"
                        disabled={!isEditing}
                        onChange={handleImageChange}
                        className="w-full border rounded px-4 py-2"
                    />
                </div>

                <div>
                    <label>District</label>
                    <select
                        name="district"
                        value={selectedDistrictId}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className="w-full border rounded px-4 py-2"
                    >
                        <option value="">Select District</option>
                        {districts.map((d) => (
                            <option key={d._id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Upazilla</label>
                    <select
                        name="upazilla"
                        value={selectedUpazillaId}
                        disabled={!isEditing || !selectedDistrictId}
                        onChange={handleInputChange}
                        className="w-full border rounded px-4 py-2"
                    >
                        <option value="">Select Upazilla</option>
                        {upazillas.map((u) => (
                            <option key={u._id} value={u.id}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Blood Group</label>
                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        className="w-full border rounded px-4 py-2"
                    >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map((bg) => (
                            <option key={bg} value={bg}>
                                {bg}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex justify-end mt-3">
                {!isEditing ? (
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-red-600 text-base hover:bg-red-800 cursor-pointer"
                    >
                        Edit
                    </Button>
                ) : (
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-green-600 hover:bg-green-800 cursor-pointer"
                    >
                        {saving ? "Saving..." : "Save"}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
