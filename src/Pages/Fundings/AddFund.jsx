import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import useAxios from '../../CustomHooks/useAxios';
import useAuth from '../../CustomHooks/useAuth';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';

// তোমার Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxios();
    const { user } = useAuth();

    const [amount, setAmount] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        if (!amount || Number(amount) <= 0) {
            Swal.fire('Error', 'Please enter a valid amount', 'error');
            return;
        }

        setProcessing(true);

        try {
            // ১. Create Payment Intent from backend
            const { data: paymentIntentRes } = await axiosSecure.post('/api/create-payment-intent', {
                amount: Number(amount),
            });

            const clientSecret = paymentIntentRes.clientSecret;
            const cardElement = elements.getElement(CardElement);

            // ২. Confirm Card Payment
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user?.displayName || 'Anonymous',
                        email: user?.email || 'no-email@example.com',
                    },
                },
            });

            if (paymentResult.error) {
                Swal.fire('Payment failed', paymentResult.error.message, 'error');
                setProcessing(false);
                return;
            }

            if (paymentResult.paymentIntent.status === 'succeeded') {
                // ৩. Save fund to DB
                await axiosSecure.post('/api/fund', {
                    userId: user?._id,
                    userName: user?.displayName || 'Anonymous',
                    userEmail: user?.email || 'no-email@example.com',
                    amount: Number(amount),
                    paymentIntentId: paymentResult.paymentIntent.id,
                });

                Swal.fire('Success', 'Thank you for your donation!', 'success');
                setAmount('');
                cardElement.clear();
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.error || error.message, 'error');
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow mt-10">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Give Fund</h2>

            <label className="block mb-2 font-medium">
                Amount (USD)
                <input
                    type="number"
                    step="0.01"
                    min="1"
                    className="w-full px-3 py-2 border rounded mt-1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={processing}
                    required
                />
            </label>

            <label className="block mb-4 font-medium">
                Card Details
                <div className="p-2 border rounded mt-1">
                    <CardElement options={{ hidePostalCode: true }} />
                </div>
            </label>

            <Button
                type="submit"
                disabled={!stripe || processing}
                className="bg-red-600 hover:bg-red-700 text-white w-full"
            >
                {processing ? 'Processing...' : 'Pay'}
            </Button>
        </form>
    );
};

const AddFund = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default AddFund;
