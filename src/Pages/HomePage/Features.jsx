import React from 'react';
import { FaHeartbeat, FaHandsHelping, FaSmileBeam } from 'react-icons/fa';
import donateImage from '../../assets/feature.jpg';
import { Link } from 'react-router';

const Features = () => {
    const features = [
        {
            id: 1,
            icon: <FaHeartbeat className="text-red-600 w-8 h-8" />,
            title: 'Save Lives',
            description: 'Every donation can help save up to 3 lives and bring hope to families in need.',
        },
        {
            id: 2,
            icon: <FaHandsHelping className="text-red-600 w-8 h-8" />,
            title: 'Build Community',
            description: 'Join a life-saving network of volunteers and spread awareness in your community.',
        },
        {
            id: 3,
            icon: <FaSmileBeam className="text-red-600 w-8 h-8" />,
            title: 'Feel Good',
            description: 'Donating blood regularly improves your health and brings immense satisfaction.',
        },
    ];

    return (
        <section className="bg-white py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                {/* Image */}
                <div data-aos="fade-right" className="relative">
                    <img
                        src={donateImage}
                        alt="Blood Donation"
                        className="rounded-xl shadow-lg w-full h-auto lg:h-110 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 rounded-xl"></div>
                </div>

                {/* Content */}
                <div data-aos="fade-left" className="space-y-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600">
                        Why Donate Blood?
                    </h2>
                    <p className="text-gray-700 text-xs md:text-sm xl:text-base">
                        Your simple act of kindness today can become someone’s lifeline tomorrow.
                        Find out how your donation makes a real difference.
                    </p>

                    <div className="space-y-6">
                        {features.map((feature) => (
                            <div key={feature.id} className="flex items-start gap-4">
                                <div className="flex-shrink-0 p-3 bg-[#fdecea] rounded-full">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-red-600 lg:text-lg">{feature.title}</h3>
                                    <p className="text-xs text-gray-600 xl:text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link to='/user-registration'>
                        <button className="mt-6 inline-block bg-red-600 text-white px-4 py-2 text-xs lg:px-6 lg:py-3 rounded-md hover:bg-red-800 cursor-pointer">
                            Become a Donor
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Features;
