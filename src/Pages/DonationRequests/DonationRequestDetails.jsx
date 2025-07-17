import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../../CustomHooks/useAxios';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useAuth from '../../CustomHooks/useAuth';
import Swal from 'sweetalert2';

const DonationRequestDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxios();
    const { user } = useAuth();
    const [details, setDetails] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/donation-requests/${id}`)
            .then(res => setDetails(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure, id]);


    const handleConfirmDonation = async () => {
        try {
            const res = await axiosSecure.patch(`/donation-requests/${id}`, {
                status: 'inprogress',
            });
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Donation status updated to inprogress!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
                setDetails(prev => ({ ...prev, status: 'inprogress' }));
                setOpen(false);
                navigate('/pending-donation-requests')
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Something went wrong. Please try again.',
            });
        }
    };


    if (!details) return <p>Loading...</p>;

    return (
        <section className="flex justify-center p-6">
            <Card className="w-full max-w-2xl shadow-lg border border-red-200">
                <CardHeader>
                    <CardTitle className="text-2xl text-red-600">Donation Request Details</CardTitle>
                    <p className="text-gray-500">Requested by: {details.requesterName} ({details.requesterEmail})</p>
                </CardHeader>

                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='space-y-2'>
                        <p><strong>Recipient:</strong> {details.recipientName}</p>
                        <p><strong>District:</strong> {details.recipientDistrict}</p>
                        <p><strong>Upazila:</strong> {details.recipientUpazila}</p>
                        <p><strong>Hospital:</strong> {details.hospitalName}</p>
                        <p><strong>Address:</strong> {details.address}</p>
                    </div>
                    <div className='space-y-2'>
                        <p><strong>Blood Group:</strong> {details.bloodGroup}</p>
                        <p><strong>Donation Date:</strong> {details.donationDate}</p>
                        <p><strong>Donation Time:</strong> {details.donationTime}</p>
                        <p><strong>Status:</strong> <span className="capitalize">{details.status}</span></p>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
                    <div className="w-full">
                        <p><strong>Request Message:</strong></p>
                        <p className="text-gray-700">{details.requestMessage}</p>
                    </div>

                    {details.status === 'pending' && (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-red-600 text-white hover:bg-red-700">
                                    Donate
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Confirm Your Donation</DialogTitle>
                                    <DialogDescription>
                                        Please confirm your name & email before proceeding.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Donor Name</label>
                                        <Input value={user?.displayName || ''} readOnly />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Donor Email</label>
                                        <Input value={user?.email || ''} readOnly />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleConfirmDonation} className="bg-green-600 text-white hover:bg-green-700">
                                        Confirm Donation
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </CardFooter>
            </Card>
        </section>
    );
};

export default DonationRequestDetails;
