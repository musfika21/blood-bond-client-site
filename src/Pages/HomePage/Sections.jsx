import React, { useEffect } from 'react';
import { Link } from 'react-router';
import CommonButton from '../../shared/CommonButton';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Sections = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  // Sample data for donation requests and blogs (replace with API data)
  const donationRequests = [
    { id: 1, title: 'O+ Needed in Dhaka', details: 'Urgent: Required by Aug 20, 2025', link: '/request/1' },
    { id: 2, title: 'AB- Needed in Chittagong', details: 'Critical: Needed by Aug 18, 2025', link: '/request/2' },
    { id: 3, title: 'A+ Needed in Sylhet', details: 'Urgent: Required by Aug 22, 2025', link: '/request/3' },
  ];

  const blogs = [
    { id: 1, title: 'Why Donate Blood?', summary: 'Discover the impact of your donation.', image: 'https://via.placeholder.com/300x150', link: '/blog/why-donate' },
    { id: 2, title: 'Health Benefits of Donating', summary: 'Learn how donating improves your health.', image: 'https://via.placeholder.com/300x150', link: '/blog/health-benefits' },
    { id: 3, title: 'Donor Stories', summary: 'Real stories from our community.', image: 'https://via.placeholder.com/300x150', link: '/blog/donor-stories' },
  ];

  const stories = [
    { id: 1, title: 'A Life Saved', summary: 'Thanks to our donors, a young patient received O+ blood in time.', link: '/stories/1' },
    { id: 2, title: 'Community Impact', summary: 'Our blood drive saved multiple lives in a local hospital.', link: '/stories/2' },
  ];

  return (
    <div className="w-full bg-gray-100 min-h-screen">    
      {/* Mission Statement */}
      <section className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 xl:max-w-7xl py-12 " data-aos="fade-up" data-aos-delay="200">
        <div className="text-center">
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-semibold text-red-600 mb-4">Our Mission</h2>
          <p className="text-base xs:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            To foster a global community of blood donors and recipients through a secure, user-friendly platform, ensuring no one suffers due to blood shortages.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 xl:max-w-7xl py-12" data-aos="fade-up" data-aos-delay="300">
        <h2 className="text-2xl xs:text-3xl md:text-4xl font-semibold text-gray-800 mb-6 text-center">How It Works</h2>
        <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Register', desc: 'Sign up in minutes to join our community.' },
            { title: 'Search', desc: 'Find urgent blood requests near you.' },
            { title: 'Donate', desc: 'Schedule and track your donations.' },
            { title: 'Impact', desc: 'See the lives you’ve helped save.' },
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white p-4 xs:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              data-aos="zoom-in"
              data-aos-delay={400 + index * 100}
            >
              <h3 className="text-lg xs:text-xl font-semibold text-red-600 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm xs:text-base">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/how-it-works">
            <CommonButton text="Learn More" className="text-sm xs:text-base" />
          </Link>
        </div>
      </section>

      {/* Latest Donation Requests */}
      <section className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 xl:max-w-7xl py-12" data-aos="fade-up" data-aos-delay="400">
        <h2 className="text-2xl xs:text-3xl md:text-4xl font-semibold text-gray-800 mb-6 text-center">Urgent Donation Requests</h2>
        <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {donationRequests.map((request, index) => (
            <div
              key={request.id}
              className="bg-white p-4 xs:p-6 rounded-lg shadow-md border border-red-600 hover:shadow-lg transition-shadow"
              data-aos="fade-up"
              data-aos-delay={500 + index * 100}
            >
              <h3 className="text-lg xs:text-xl font-semibold text-gray-800 mb-2">{request.title}</h3>
              <p className="text-gray-600 text-sm xs:text-base">{request.details}</p>
              <Link to={request.link}>
                <CommonButton text="Respond Now" className="text-sm xs:text-base mt-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 xl:max-w-7xl py-12" data-aos="fade-up" data-aos-delay="500">
        <h2 className="text-2xl xs:text-3xl md:text-4xl font-semibold text-gray-800 mb-6 text-center">Featured Blogs</h2>
        <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className="bg-white p-4 xs:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              data-aos="fade-up"
              data-aos-delay={600 + index * 100}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-32 xs:h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg xs:text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm xs:text-base">{blog.summary}</p>
              <Link to={blog.link}>
                <CommonButton text="Read More" className="text-sm xs:text-base mt-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 xl:max-w-7xl py-12" data-aos="fade-up" data-aos-delay="600">
        <h2 className="text-2xl xs:text-3xl md:text-4xl font-semibold text-gray-800 mb-6 text-center">Success Stories</h2>
        <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="bg-white p-4 xs:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              data-aos="zoom-in"
              data-aos-delay={700 + index * 100}
            >
              <h3 className="text-lg xs:text-xl font-semibold text-gray-800 mb-2">{story.title}</h3>
              <p className="text-gray-600 text-sm xs:text-base">{story.summary}</p>
              <Link to={story.link}>
                <CommonButton text="Read Story" className="text-sm xs:text-base mt-4" />
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/submit-story">
            <CommonButton text="Share Your Story" className="text-sm xs:text-base" />
          </Link>
        </div>
      </section>

      {/* Get Involved */}
      <section className="bg-red-600 text-white py-12" data-aos="fade-up" data-aos-delay="700">
        <div className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 xl:max-w-7xl text-center">
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-semibold mb-4">Get Involved</h2>
          <p className="text-base xs:text-lg md:text-xl max-w-3xl mx-auto mb-6 leading-relaxed">
            Join our community of lifesavers today! Whether you donate, volunteer, or spread the word, every action counts.
          </p>
          <div className="flex flex-col xs:flex-row justify-center gap-4">
            <Link to="/user-registration">
              <CommonButton text="Become a Donor" className="bg-white text-red-600 hover:bg-gray-200 text-sm xs:text-base" />
            </Link>
            <Link to="/volunteer">
              <CommonButton text="Volunteer" className="bg-gray-800 hover:bg-gray-900 text-sm xs:text-base" />
            </Link>
            <Link to="/#contact">
              <CommonButton text="Contact Us" className="bg-gray-800 hover:bg-gray-900 text-sm xs:text-base" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sections;