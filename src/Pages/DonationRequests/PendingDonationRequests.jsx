import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../CustomHooks/useAuth';
import useAxios from '../../CustomHooks/useAxios';
import CommonButton from '../../shared/CommonButton';

const PendingDonationRequests = () => {
  // const axiosSecure = useAxiosSecure();
  const axiosSecure = useAxios();
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "/pending-donation-requests") {
      window.document.title = "Donation Requests (Pending)";
    }
  }, [location.pathname]);

  useEffect(() => {
    axiosSecure.get('/donation-requests/pending')
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure]);

  const handleView = (id) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/donation-requests/${id}`);
    }
  };

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Pending Donation Requests</h2>

      {requests.length === 0 ?
        <>
          <p className="text-gray-600 mt-15 mb-5 text-center">No pending donation requests found.</p>
          <Link to='/dashboard/donation-request' className='flex justify-center mb-10'><CommonButton>Add Donation Requests</CommonButton></Link>
        </> :
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Requester Name</th>
                <th className="text-left px-4 py-2">Recipient Name</th>
                <th className="text-left px-4 py-2">Location</th>
                <th className="text-left px-4 py-2">Blood Group</th>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">Time</th>
                <th className="text-left px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req._id} className="border-t">
                  <td className="px-4 py-2">{req.requesterName}</td>
                  <td className="px-4 py-2">{req.recipientName}</td>
                  <td className="px-4 py-2">{req.address}</td>
                  <td className="px-4 py-2">{req.bloodGroup}</td>
                  <td className="px-4 py-2">{req.donationDate}</td>
                  <td className="px-4 py-2">{req.donationTime}</td>
                  <td className="px-4 py-2">
                    <Button onClick={() => handleView(req._id)} className="bg-red-600 text-white hover:bg-red-700 cursor-pointer">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </section>
  );
};

export default PendingDonationRequests;
