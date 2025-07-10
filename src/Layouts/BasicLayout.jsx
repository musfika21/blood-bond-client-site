import React from 'react';
import { Outlet } from 'react-router';
import NavigationBar from '../ProjectComponets/NavigationBar';
import Footer from '../ProjectComponets/Footer';

const BasicLayout = () => {
    return (
        <>
        <header>
            <NavigationBar/>
        </header>
        <main className='min-h-[calc(100vh-210px)] py-18'>
            <Outlet/>
        </main>
        <footer>
            <Footer/>
        </footer>
        
        </>
    );
};

export default BasicLayout;