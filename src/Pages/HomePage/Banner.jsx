import React from 'react';
import banner from '../../assets/banner.jpg';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-xl">
            {/* Background image */}
            <img
                src={banner}
                alt="Blood Donation Banner"
                className="w-full h-full object-cover"
            />

            {/* Black gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/50"></div>

            {/* Centered Text & Buttons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                    Give the Gift of Life
                </h1>
                <p className="text-white mb-6 max-w-xl">
                    Your blood donation can save lives. Join our community of donors and make a difference.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link to='/user-registration'>
                        <Button className="bg-red-600 text-base text-white px-6 py-2 rounded-md hover:bg-red-800 cursor-pointer">
                            Join as a Donor
                        </Button>
                    </Link>
                    <Link to='/search-donor'>
                        <Button className="bg-white text-base text-black px-6 py-2 rounded-md hover:bg-gray-200 cursor-pointer">
                            Search Donors
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
