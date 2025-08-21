import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import CommonButton from '../../shared/CommonButton';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAxios from '../../CustomHooks/useAxios';

const Sections = () => {

  const axios = useAxios();
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);


  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/blogs');
        const sortedBlogs = response.data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);


  return (
    <div className="w-full min-h-screen">
      {/* Mission Statement */}
      <section className="min-w-11/12 mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 xl:max-w-7xl py-12 " data-aos="fade-up" data-aos-delay="200">
        <div className="text-center">
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-red-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-xs md:text-sm xl:text-base leading-relaxed">
            To foster a global community of blood donors and recipients through a secure, user-friendly platform, ensuring no one suffers due to blood shortages.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="min-w-11/12 mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 xl:max-w-7xl py-12" data-aos="fade-up" data-aos-delay="300">
        <h2 className="text-2xl xs:text-3xl md:text-4xl font-semibold text-red-600 mb-6 text-center">How It Works</h2>
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
            <CommonButton className="text-sm xs:text-base">Learn More</CommonButton>
          </Link>
        </div>
      </section>


      {/* Featured Blogs */}
      <section className="min-w-11/12 mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 xl:max-w-7xl py-12" data-aos="fade-up" data-aos-delay="500">
        <h2 className="text-2xl xs:text-3xl md:text-4xl font-semibold text-red-600 mb-6 text-center">Featured Blogs</h2>
        <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white p-4 xs:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={600 + index * 100}
              >
                <img
                  src={blog.thumbnail || 'https://via.placeholder.com/300x200'}
                  alt={blog.title}
                  className="w-full h-50 xs:h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg xs:text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm xs:text-base">
                  {blog.content.length > 100 ? `${blog.content.slice(0, 100)}...` : blog.content}
                </p>                
                <Link to={`/blog/${blog.id}`}>
                <p className='text-red-600 underline my-3'>Read More</p>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">Loading blogs...</p>
          )}
        </div>
        <Link to='/blogs' className='flex justify-center'><CommonButton>Read More Blogs</CommonButton></Link>
      </section>

      
    </div>
  );
};

export default Sections;