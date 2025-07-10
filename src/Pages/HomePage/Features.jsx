import React from 'react';
import { FaHeartbeat, FaHandsHelping, FaSmileBeam } from 'react-icons/fa';
import donateImage from '../../assets/feature.jpg'; // তোমার image path অনুযায়ী update করো

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
        <div className="relative">
          <img
            src={donateImage}
            alt="Blood Donation"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/30 rounded-xl"></div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#9b111f]">
            Why Donate Blood?
          </h2>
          <p className="text-gray-700">
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
                  <h3 className="text-lg font-semibold text-[#9b111f]">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 inline-block bg-[#9b111f] text-white px-6 py-3 rounded-md hover:bg-[#7a0e18]">
            Become a Donor
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
