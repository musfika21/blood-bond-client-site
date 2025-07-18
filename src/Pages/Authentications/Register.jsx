import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router";
import useAuth from "../../CustomHooks/useAuth";
import useAxios from "../../CustomHooks/useAxios";
import Swal from "sweetalert2";
import { Button } from "@material-tailwind/react";
import { IoEye } from "react-icons/io5";
import { PiEyeClosedBold } from "react-icons/pi";
import axios from "axios";

const Register = () => {
    const { createUser, updateUserInfo, setCurrentUser, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxios();
    const from = location.state?.from?.pathname || "/";

    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState("");
    const [selectedDistrictName, setSelectedDistrictName] = useState("");
    const [selectedUpazillaId, setSelectedUpazillaId] = useState("");
    const [selectedUpazillaName, setSelectedUpazillaName] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (location.pathname === "/user-registration") {
            window.document.title = "Register | Blood Bond";
        }
    }, [location.pathname]);

    const password = watch("password");

    // Fetch Districts
    useEffect(() => {
        axiosSecure.get("/districts").then((res) => setDistricts(res.data));
    }, [axiosSecure]);

    // Fetch Upazillas when District changes
    useEffect(() => {
        if (selectedDistrictId) {
            axiosSecure
                .get(`/upazillas/${selectedDistrictId}`)
                .then((res) => setUpazillas(res.data));
        } else {
            setUpazillas([]);
        }
        setSelectedUpazillaId("");
        setSelectedUpazillaName("");
    }, [selectedDistrictId, axiosSecure]);

    // Image Upload Handler
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
            formData
        );
        return res.data.data.url;
    };

    const onSubmit = async (data) => {
        try {
            if (data.password !== data.confirmPassword) {
                Swal.fire({
                    title: "Oops!",
                    text: "Passwords do not match!",
                    icon: "error",
                    background: "#fff",
                    color: "#b91c1c",
                    confirmButtonColor: "#b91c1c",
                });
                return;
            }

            if (!avatarFile) {
                Swal.fire({
                    title: "Required!",
                    text: "Please upload a profile picture",
                    icon: "warning",
                    background: "#fff",
                    color: "#92400e",
                    confirmButtonColor: "#ca8a04",
                });
                return;
            }

            let avatarUrl = await handleImageUpload(avatarFile);

            const userCredential = await createUser(data.email, data.password);
            await updateUserInfo({
                displayName: data.name,
                photoURL: avatarUrl,
            });

            const saveUser = {
                name: data.name,
                email: data.email,
                avatar: avatarUrl,
                bloodGroup: data.bloodGroup,
                districtId: selectedDistrictId,
                districtName: selectedDistrictName,
                upazillaId: selectedUpazillaId,
                upazillaName: selectedUpazillaName,
                role: "donor",
                status: "active",
                createdAt: new Date(),
            };

            const response = await axiosSecure.post("/donors", saveUser);
            if (response.data.inserted === false) {
                setCurrentUser(response.data.savedUser);
                Swal.fire({
                    title: "Warning!",
                    text: "User already exists!",
                    icon: "warning",
                    background: "#fef9c3",
                    color: "#92400e",
                    iconColor: "#facc15",
                    confirmButtonColor: "#ca8a04",
                });
                return;
            }

            // ✅ Set currentUser immediately after successful insertion
            setCurrentUser(saveUser);

            Swal.fire({
                title: "Success!",
                text: "Registration complete!",
                icon: "success",
                background: "#fff",
                color: "#16a34a",
                confirmButtonColor: "#dc2626",
            });

            reset();
            setAvatarFile(null);
            setSelectedDistrictId("");
            setSelectedDistrictName("");
            setSelectedUpazillaId("");
            setSelectedUpazillaName("");
            navigate(from, { replace: true });
        } catch (err) {
            console.error("Registration Error:", err);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong!",
                icon: "error",
                confirmButtonColor: "#dc2626",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-red-100 to-white">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow p-6 md:p-10">
                <h1 className="text-3xl font-bold text-center mb-2">Join Us!</h1>
                <h2 className="text-xl text-center text-red-600 mb-8">Register as Donor</h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                    {/* Email */}
                    <div>
                        <label>Email</label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Name */}
                    <div>
                        <label>Full Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            placeholder="Your name"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Avatar */}
                    <div>
                        <label>Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                            onChange={(e) => setAvatarFile(e.target.files[0])}
                        />
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label>Blood Group</label>
                        <select
                            {...register("bloodGroup", {
                                required: "Select your blood group",
                            })}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                        >
                            <option value="">Select Blood Group</option>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                                <option key={bg} value={bg}>
                                    {bg}
                                </option>
                            ))}
                        </select>
                        {errors.bloodGroup && (
                            <p className="text-red-500 text-sm">{errors.bloodGroup.message}</p>
                        )}
                    </div>

                    {/* District */}
                    <div>
                        <label>District</label>
                        <select
                            value={selectedDistrictId}
                            onChange={(e) => {
                                const id = e.target.value;
                                const name = districts.find((d) => d.id === id)?.name || "";
                                setSelectedDistrictId(id);
                                setSelectedDistrictName(name);
                            }}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                        >
                            <option value="">Select District</option>
                            {districts.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Upazilla */}
                    <div>
                        <label>Upazilla</label>
                        <select
                            value={selectedUpazillaId}
                            onChange={(e) => {
                                const id = e.target.value;
                                const name = upazillas.find((u) => u.id === id)?.name || "";
                                setSelectedUpazillaId(id);
                                setSelectedUpazillaName(name);
                            }}
                            disabled={!selectedDistrictId}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                        >
                            <option value="">Select Upazilla</option>
                            {upazillas.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label>Password</label>
                        <input
                            {...register("password", {
                                required: "Password required",
                                minLength: { value: 6, message: "Min 6 characters" },
                            })}
                            type={showPass ? "text" : "password"}
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-4 top-8"
                        >
                            {showPass ? <IoEye /> : <PiEyeClosedBold />}
                        </button>
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label>Confirm Password</label>
                        <input
                            {...register("confirmPassword", {
                                required: "Confirm your password",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-8"
                        >
                            {showConfirm ? <IoEye /> : <PiEyeClosedBold />}
                        </button>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <Button
                            type="submit"
                            className="w-full bg-red-600 text-white py-3 cursor-pointer"
                        >
                            Register
                        </Button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link
                        to="/login-user"
                        className="text-red-600 font-semibold cursor-pointer"
                    >
                        Login Here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
