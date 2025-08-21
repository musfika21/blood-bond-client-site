import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const testimonialsData = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Blood Donor',
        quote: 'Donating through Blood Bond was seamless! The process was quick, and knowing my donation saved lives feels incredible.',
        image: 'https://i.ibb.co.com/KxYVzwRB/Georgian-woman.jpg',
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Recipient',
        quote: 'Thanks to Blood Bond, I received the blood I needed during surgery. The platform made it so easy for donors to help.',
        image: 'https://i.ibb.co.com/wFVpGMMF/a.jpg',
    },
    {
        id: 3,
        name: 'Emily Davis',
        role: 'Volunteer',
        quote: 'I love being part of Blood Bond’s mission. The team is dedicated, and the platform makes a real difference!',
        image: 'https://i.ibb.co.com/LzKj1sfL/nazy.webp',
    },
];

const Testimonials = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section className="min-w-11/12 mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 xl:max-w-7xl py-12 bg-white" data-aos="fade-up">
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-semibold text-red-600 mb-6 text-center">
                What Our Community Says
            </h2>
            <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {testimonialsData.map((testimonial, index) => (
                    <div
                        key={testimonial.id}
                        className="bg-white p-4 xs:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        data-aos="fade-up"
                        data-aos-delay={100 + index * 100}
                    >
                        <div className="flex items-center mb-4">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-12 h-12 xs:w-16 xs:h-16 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h3 className="text-lg xs:text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm xs:text-base italic">
                            "{testimonial.quote.length > 100 ? `${testimonial.quote.slice(0, 100)}...` : testimonial.quote}"
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;