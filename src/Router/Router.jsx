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
import ProfilePage from '../Pages/Dashboard/ProfilePage';
import CreateDonationRequest from '../Pages/Dashboard/CreateDonationRequest';
import EditDonationRequest from '../Pages/Dashboard/EditDonationRequest';
import Loader from '../shared/Loader';

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
                path: 'home',
                Component: Dashboard
            },
            {
                path: 'my-donation-requests',
                Component: MyDonationRequests
            },
            {
                path: 'profile',
                Component: ProfilePage
            },
            {
                path: 'donation-request',
                Component: CreateDonationRequest
            },
            {
                path: 'update-donation-request/:id',
                loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_API}/donation-requests/${params.id}`),
                HydrateFallback: <Loader/>,
                Component: EditDonationRequest
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