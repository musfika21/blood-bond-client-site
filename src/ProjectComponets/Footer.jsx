import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-red-50 py-8 px-4">
      <div className="max-w-5xl mx-auto text-center">

        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          <img className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" src={logo} alt="drop of blood" />
          <span className="text-base md:text-lg lg:text-xl font-semibold ml-2">Blood Bond</span>
        </div>

        {/* Heading */}
        <h2 className="text-xl md:text-3xl font-semibold mb-4">
          Caring Through Every Drop.
        </h2>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-700 text-sm mb-6">
          <a href="#" className="hover:text-gray-900">News & Blogs</a>
          <a href="#" className="hover:text-gray-900">About Us</a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-5 mb-4">
          <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full hover:bg-gray-200 transition">
            <FaFacebookF className="w-4 h-4 text-gray-700" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full hover:bg-gray-200 transition">
            <FaTwitter className="w-4 h-4 text-gray-700" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full hover:bg-gray-200 transition">
            <FaInstagram className="w-4 h-4 text-gray-700" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full hover:bg-gray-200 transition">
            <FaLinkedinIn className="w-4 h-4 text-gray-700" />
          </a>
          <a href="mailto:info@crimsoncare.org" className="p-3 bg-white rounded-full hover:bg-gray-200 transition">
            <FaEnvelope className="w-4 h-4 text-gray-700" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-700">&copy; {new Date().getFullYear()} Blood Bond. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
