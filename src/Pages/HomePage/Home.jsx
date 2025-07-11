import React from 'react';
import Banner from './Banner';
import InfoCards from './InfoCards';
import Features from './Features';
import ContactUs from './ContactUs';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Features/>
            <ContactUs/>
            <InfoCards/>
        </div>
    );
};

export default Home;