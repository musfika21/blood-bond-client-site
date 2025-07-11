import React from 'react';
import { createBrowserRouter } from 'react-router';
import BasicLayout from '../Layouts/BasicLayout';
import Home from '../Pages/HomePage/Home';
import Register from '../Pages/Authentications/Register';
import Blog from '../Pages/Blog/Blog';
import Login from '../Pages/Authentications/Login';
import DashboardLayout from '../Layouts/DashboardLayout';
import PrivateRoutes from '../Routes/PrivateRoute';
import SearchDonor from '../ProjectComponets/SearchDonor';
import Dashboard from '../Pages/Dashboard/Dashboard';
import MyDonationRequests from '../Pages/Dashboard/MyDonationRequests';

const Router = createBrowserRouter([
    {
        path: '/',
        Component: BasicLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'blogs',
                Component: Blog
            },
            {
                path: 'search-donor',
                Component: SearchDonor
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><DashboardLayout/></PrivateRoutes>,
        children: [
            {
                index: true,
                Component: Dashboard
            },
            {
                path: 'my-donation-requests',
                Component: MyDonationRequests
            }
        ]
    },
    {
        path: 'user-registration',
        Component: Register
    },
    {
        path: 'login-user',
        Component: Login
    },
])

export default Router;