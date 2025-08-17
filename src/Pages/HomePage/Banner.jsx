import React from 'react';
import banner from '../../assets/banner.jpg';
import { Button } from '@material-tailwind/react';
import { NavLink } from 'react-router';

const Banner = () => {
  return (
    <div className="relative w-full min-h-[200px] sm:min-h-[300px] md:min-h-[450px] lg:min-h-[calc(100vh-61px)] overflow-hidden">
      {/* Background image */}
      <img
        src={banner}
        alt="Blood Donation Banner"
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
        loading="lazy"
      />

      {/* Black gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/60"></div>

      {/* Centered Text & Buttons */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 animate-fade-in">
        <h1 className="text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 md:mb-6">
          Give the Gift of Life
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
          Your blood donation can save lives. Join our community of donors and make a difference.
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6">
          <NavLink to="/user-registration">
            <Button
              className="bg-red-600 text-xs sm:text-sm md:text-base lg:text-lg text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-md hover:bg-red-800 transition-colors duration-300 focus:ring-2 focus:ring-red-500 focus:outline-none cursor-pointer"
              aria-label="Join as a blood donor"
            >
              Join as a Donor
            </Button>
          </NavLink>
          <NavLink to="/search-donor">
            <Button
              className="bg-white text-xs sm:text-sm md:text-base lg:text-lg text-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-md hover:bg-gray-200 transition-colors duration-300 focus:ring-2 focus:ring-gray-400 focus:outline-none cursor-pointer"
              aria-label="Search for blood donors"
            >
              Search Donors
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Banner;