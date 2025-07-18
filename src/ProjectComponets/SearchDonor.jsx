import React, { useEffect, useState } from 'react';
import useAxios from '../CustomHooks/useAxios';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '../CustomHooks/UseAxiosSecure';

const SearchDonor = () => {
    const axiosSecure = useAxiosSecure();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [formData, setFormData] = useState({
        bloodGroup: '',
        district: '',
        upazila: '',
    });
    const [donors, setDonors] = useState([]);


    useEffect(() => {
        axiosSecure.get('/districts')
            .then(res => setDistricts(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure]);

    useEffect(() => {
        if (selectedDistrict) {
            axiosSecure.get(`/upazillas/${selectedDistrict}`)
                .then(res => setUpazilas(res.data))
                .catch(err => console.error(err));
        } else {
            setUpazilas([]);
        }
    }, [selectedDistrict, axiosSecure]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'district') {
            setSelectedDistrict(value);
            setFormData({ ...formData, district: value, upazila: '' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const encodedFormData = {
            ...formData,
            bloodGroup: encodeURIComponent(formData.bloodGroup),
        };
        axiosSecure.get('/donors-search', {
            params: encodedFormData,
        })
            .then(res => setDonors(res.data))
            .catch(err => console.error(err));
    };

    return (
        <section className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Search Blood Donors</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Blood Group */}
                <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                    className="border px-4 py-2 rounded-md w-full cursor-pointer"
                >
                    <option value="">Select Blood Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                    ))}
                </select>

                {/* District */}
                <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    className="border px-4 py-2 rounded-md w-full cursor-pointer"
                >
                    <option value="">Select District</option>
                    {districts.map(d => (
                        <option key={d._id} value={d.id}>{d.name}</option>
                    ))}
                </select>

                {/* Upazila */}
                <select
                    name="upazila"
                    value={formData.upazila}
                    onChange={handleChange}
                    disabled={!selectedDistrict}
                    className="border px-4 py-2 rounded-md w-full cursor-pointer"
                >
                    <option value="">Select Upazila</option>
                    {upazilas.map(u => (
                        <option key={u._id} value={u.id}>{u.name}</option>
                    ))}
                </select>

                <Button
                    type="submit"
                    className="w-1/2 mx-auto md:col-span-3 bg-red-600 text-white hover:bg-red-800 cursor-pointer"
                >
                    Search
                </Button>
            </form>

            {/* Donor Results */}
            <div>
                {donors.length === 0 ? (
                    <p className="text-gray-600 text-center">No donors found. Please search above.</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {donors.map((donor) => (
                            <div className="flex items-center border border-gray-200 rounded-lg p-4 w-fit bg-white">
                                {/* Icon or Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center">
                                        <img className="h-18 w-18 md:h-25 md:w-25" src={donor.avatar} alt="" />
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="ml-4 space-y-1 text-sm">
                                    <p>
                                        <span className="font-bold">Name:</span> &nbsp;
                                        <span className="font-semibold">{donor.name}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">Group:</span> &nbsp;
                                        <span className="font-semibold">{donor.bloodGroup}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">District:</span> &nbsp;
                                        <span className="font-semibold">
                                            {districts.find(d => d._id === donor.districtId)?.name || donor.districtName || donor.districtId}
                                        </span>
                                    </p>
                                </div>
                            </div>


                        ))}
                    </div>
                )}
            </div>

        </section>
    );
};

export default SearchDonor;
