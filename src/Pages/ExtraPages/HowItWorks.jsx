import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-white max-w-11/12 mx-auto">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <section className="text-center" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-red-600 mb-6">How It Works</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Donating blood through Blood Bond is simple, safe, and impactful. Follow these steps to become a lifesaver!
          </p>
        </section>

        {/* Steps */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="100">
            <div className="text-red-600 text-5xl font-bold mb-4">1</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Register & Schedule</h3>
            <p className="text-gray-600">
              Sign up on our platform and schedule a convenient time and location for your blood donation. You’ll receive a confirmation and reminders.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="200">
            <div className="text-red-600 text-5xl font-bold mb-4">2</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Visit Donation Center</h3>
            <p className="text-gray-600">
              Arrive at the donation center, where our trained staff will guide you through a quick health screening and the donation process.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="300">
            <div className="text-red-600 text-5xl font-bold mb-4">3</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Donate & Save Lives</h3>
            <p className="text-gray-600">
              Donate blood in just 10-15 minutes. Your donation can save up to three lives! Relax with a snack afterward and feel proud of your impact.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HowItWorks;