import React from "react";
import { Button } from "@material-tailwind/react";
import pic from "../../assets/cover.png";

const ContactUs = () => {
    return (
        <>
            <div id="#contact" className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Contact Form */}
                    <div data-aos="fade-right" className="w-full rounded-2xl p-6 sm:p-8 md:p-10">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600 mb-6">
                            Contact Us
                        </h2>

                        <form className="space-y-5">
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-1 text-gray-700 font-medium"
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-1 text-gray-700 font-medium"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                                    placeholder="you@example.com"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block mb-1 text-gray-700 font-medium"
                                >
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    required
                                    placeholder="Enter your message"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                                ></textarea>
                            </div>

                            {/* Send Button */}
                            <Button
                                type="submit"
                                className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-800 transition duration-200 cursor-pointer"
                            >
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Image */}
                    <div data-aos="fade-left" className="w-full">
                        <img
                            src={pic}
                            alt="Contact Illustration"
                            className="w-full h-auto rounded-xl object-cover"
                        />
                    </div>
                </div>
            </div>
            <p className="text-center text-xs sm:text-sm">
                Or call us at <span>(555) 123-4567</span>
            </p>
        </>
    );
};

export default ContactUs;
