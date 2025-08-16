import React, { useEffect } from 'react';
import { Link } from 'react-router';
import CommonButton from '../../shared/CommonButton';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
    useEffect(() => {
        AOS.init({
            duration: 800, // Animation duration in milliseconds
            easing: 'ease-in-out', // Smooth easing for professional feel
            once: true, // Animations trigger only once
        });
    }, []);

    return (
        <div className="w-full px-4">
            {/* Hero Section */}
            <section className="text-red-600 pt-15" data-aos="fade-down">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About Blood Bond</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        Connecting hearts, saving lives. Join our mission to make blood donation seamless and impactful.
                    </p>
                </div>
            </section>
            <div className="border border-red-500 mt-4" data-aos="fade-in" data-aos-delay="100"></div>

            {/* Main Content */}
            <section className="container mx-auto px-4 py-12">
                <div className="">
                    {/* Welcome Section */}
                    <div className="mb-12" data-aos="fade-up" data-aos-delay="200">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Blood Bond</h2>
                        <p className="text-gray-600 leading-relaxed">
                            At Blood Bond, we believe that a single act of kindness can save lives. Founded in 2023, Blood Bond is a dedicated online platform designed to bridge the gap between blood donors and those in urgent need. Our mission is simple yet profound: to create a seamless, secure, and efficient ecosystem for blood donation that empowers communities to come together in times of crisis.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            As a professional blood donation network, we prioritize safety, transparency, and accessibility. Whether you're a donor ready to give the gift of life or someone seeking urgent blood supplies, Blood Bond is here to facilitate meaningful connections that make a real difference.
                        </p>
                    </div>

                    {/* Our Story Section */}
                    <div className="mb-12" data-aos="fade-up" data-aos-delay="300">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Story</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Blood Bond was born out of a passion for humanitarian service and a recognition of the critical shortages in blood supplies worldwide. Inspired by real-life stories of individuals whose lives were transformed by timely donations, our founders envisioned a digital solution that leverages technology to streamline the donation process. From humble beginnings as a small initiative, we have grown into a trusted platform serving thousands of users across regions.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            We are committed to innovation, constantly evolving our features to meet the needs of modern donors and recipients. Our platform is built on principles of trust, efficiency, and compassion, ensuring that every interaction contributes to a healthier society.
                        </p>
                    </div>

                    {/* Mission and Vision Section */}
                    <div className="mb-12" data-aos="fade-up" data-aos-delay="400">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission and Vision</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md" data-aos="zoom-in" data-aos-delay="500">
                                <h3 className="text-xl font-semibold text-red-600 mb-2">Mission</h3>
                                <p className="text-gray-600">
                                    To foster a global community of blood donors and recipients by providing an intuitive platform for requests, donations, and education, ultimately saving lives through timely and reliable blood matching.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md" data-aos="zoom-in" data-aos-delay="600">
                                <h3 className="text-xl font-semibold text-red-600 mb-2">Vision</h3>
                                <p className="text-gray-600">
                                    A world where no one suffers due to blood shortages, empowered by technology that unites people in acts of selfless giving.
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mt-6">
                            We achieve this through:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2">
                            <li><span className="font-semibold">Secure Donation Requests:</span> Admins and moderators can post urgent requests for blood, specifying types, locations, and details to reach potential donors quickly.</li>
                            <li><span className="font-semibold">Blog and Educational Content:</span> Our team curates insightful blogs on blood donation benefits, health tips, and success stories to raise awareness and encourage participation.</li>
                            <li><span className="font-semibold">User-Friendly Giving:</span> Donors can easily register, track their donation history, and respond to requests, all while maintaining privacy and compliance with health standards.</li>
                        </ul>
                    </div>

                    {/* What Sets Us Apart Section */}
                    <div className="mb-12" data-aos="fade-up" data-aos-delay="700">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">What Sets Us Apart</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Blood Bond stands out in the blood donation landscape by integrating advanced features with a user-centric approach:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2">
                            <li><span className="font-semibold">Community-Driven Moderation:</span> Our admins and moderators ensure a safe environment by verifying requests, moderating content, and promoting verified donors.</li>
                            <li><span className="font-semibold">Real-Time Matching:</span> Using geolocation and blood type filters, we connect donors and recipients efficiently, reducing response times in emergencies.</li>
                            <li><span className="font-semibold">Educational Resources:</span> Beyond transactions, we provide blogs, webinars, and resources to educate users on the importance of regular donations and health best practices.</li>
                            <li><span className="font-semibold">Commitment to Privacy and Ethics:</span> All data is handled with the utmost confidentiality, adhering to international health and data protection regulations.</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            We partner with hospitals, blood banks, and NGOs to amplify our impact, ensuring that every donation counts.
                        </p>
                    </div>

                    {/* Call to Action Section */}
                    <div className="text-center" data-aos="fade-up" data-aos-delay="800">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Join the Blood Bond Community</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            We invite you to become part of something greater. Whether you're donating blood, sharing our blogs, or responding to a request, your involvement helps build stronger bonds within our community. Together, we can turn compassion into action and save lives one donation at a time.
                        </p>

                        <div className="flex justify-center gap-4">
                            <Link to='/user-registration'><CommonButton>Sign Up Today</CommonButton></Link>
                            <Link to='/#contact'>
                                <button className='mt-6 inline-block bg-gray-800 text-white px-4 py-2 text-xs lg:px-6 lg:py-3 rounded-md hover:bg-gray-900 cursor-pointer'>Contact Us</button>
                            </Link>
                        </div>

                        <p className="text-gray-800 font-semibold mt-6 italic">
                            Blood Bond: Connecting Hearts, Saving Lives.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;