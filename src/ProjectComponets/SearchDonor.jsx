import React, { useEffect, useState } from 'react';
import useAxios from '../CustomHooks/useAxios';
import { Button } from '@/components/ui/button'; // যদি shadcn button use করো!

const SearchDonor = () => {
    const axiosSecure = useAxios();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [formData, setFormData] = useState({
        bloodGroup: '',
        district: '',
        upazila: '',
    });
    const [donors, setDonors] = useState([]);

    // ✅ Get districts on mount
    useEffect(() => {
        axiosSecure.get('/districts')
            .then(res => setDistricts(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure]);

    // ✅ Get upazilas when district changes
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
        console.log('Search Query:', formData);
        axiosSecure.get('/donors', { params: formData })
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
                    className="border px-4 py-2 rounded-md"
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
                    className="border px-4 py-2 rounded-md"
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
                    required
                    disabled={!selectedDistrict}
                    className="border px-4 py-2 rounded-md"
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
                    <p className="text-gray-600">No donors found. Please search above.</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {donors.map((donor) => (
                            <div key={donor._id} className="border p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-bold text-red-600">{donor.name}</h3>
                                <p>Blood Group: {donor.bloodGroup}</p>
                                <p>District: {donor.district}</p>
                                <p>Upazila: {donor.upazila}</p>
                                <p>Phone: {donor.phone}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SearchDonor;
