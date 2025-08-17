import React, { useEffect } from 'react';
import Banner from './Banner';
import InfoCards from './InfoCards';
import Features from './Features';
import ContactUs from './ContactUs';
import { useLocation } from 'react-router';
import Sections from './Sections';

const Home = () => {

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === "/") {
            window.document.title = "Blood Bond";
        }
    }, [location.pathname]);

    return (
        <div>
            <Banner/>
            {/* <Sections/> */}
            <Features/>
            <ContactUs/>
            {/* <InfoCards/> */}
        </div>
    );
};

export default Home;