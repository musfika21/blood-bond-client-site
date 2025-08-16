import React, { useEffect } from 'react';
import { Link } from 'react-router';
import CommonButton from '../../shared/CommonButton';
import AOS from 'aos';
import 'aos/dist/aos.css';

const News = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    // Sample news data (replace with dynamic data from API or state)
    const newsItems = [
        {
            id: 1,
            title: 'Urgent Blood Drive in Dhaka',
            summary: 'Join our emergency blood drive this weekend to support local hospitals facing critical shortages. All blood types needed!',
            date: 'August 10, 2025',
            link: '/news/urgent-blood-drive',
        },
        {
            id: 2,
            title: 'The Impact of Regular Blood Donation',
            summary: 'Learn how donating blood every 56 days can save lives and improve your health. Read our latest blog for insights.',
            date: 'August 5, 2025',
            link: '/blog/impact-of-donation',
        },
        {
            id: 3,
            title: 'Success Story: A Life Saved',
            summary: 'Thanks to our community, a young patient received the blood they needed. Read their inspiring story.',
            date: 'July 28, 2025',
            link: '/news/success-story',
        },
    ];

    return (
        <div className="w-full px-4">
            {/* Hero Section */}
            <section className="text-red-600 pt-15" data-aos="fade-down">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Blood Bond News</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        Stay updated with the latest blogs, donation drives, and success stories from our community. Your support makes a difference.
                    </p>
                </div>
            </section>
            <div className="border border-red-500 mt-4" data-aos="fade-in" data-aos-delay="100"></div>

            {/* News Content */}
            <section className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {newsItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            data-aos="fade-up"
                            data-aos-delay={200 + index * 100}
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{item.summary}</p>
                            <p className="text-gray-500 text-xs mb-4">Posted on: {item.date}</p>
                            {/* <Link to={item.link}>
                                <CommonButton>Read More</CommonButton>
                            </Link> */}
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="500">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Get Involved</h2>
                    <p className="text-gray-600 leading-relaxed mb-6 max-w-3xl mx-auto">
                        Want to stay informed or contribute to our mission? Sign up to receive updates or join our next blood drive.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to='/user-registration'><CommonButton>Sign Up Today</CommonButton></Link>
                        <Link to='/#contact'>
                            <button className='mt-6 inline-block bg-gray-800 text-white px-4 py-2 text-xs lg:px-6 lg:py-3 rounded-md hover:bg-gray-900 cursor-pointer'>Contact Us</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default News;