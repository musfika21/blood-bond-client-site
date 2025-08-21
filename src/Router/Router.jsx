import React from 'react';
import { createBrowserRouter } from 'react-router';
import BasicLayout from '../Layouts/BasicLayout';
import Home from '../Pages/HomePage/Home';
import Register from '../Pages/Authentications/Register';
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
import AllUsers from '../Pages/Dashboard/AllUsers';
import AllDonations from '../Pages/Dashboard/AllDonations';
import PendingDonationRequests from '../Pages/DonationRequests/PendingDonationRequests';
import DonationRequestDetails from '../Pages/DonationRequests/DonationRequestDetails';
import ContentManagement from '../Pages/Blog/ContentManagement';
import AddBlog from '../Pages/Blog/AddBlog';
import Blog from '../Pages/Blog/Blog';
import BlogDetails from '../Pages/Blog/BlogDetails';
import Fund from '../Pages/Fundings/Fund';
import AddFund from '../Pages/Fundings/AddFund';
import Forbidden from '../Pages/Error/Forbidden/Forbidden';
import AboutUs from '../Pages/FooterPage/AboutUs';
import News from '../Pages/FooterPage/News';
import HowItWorks from '../Pages/ExtraPages/HowItWorks';


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
                path: '/blogs',
                Component: Blog
            },
            {
                path: '/search-donor',
                Component: SearchDonor
            },
            {
                path: '/pending-donation-requests',
                Component: PendingDonationRequests
            },
            {
                path: '/donation-requests/:id',
                loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_API}/donation-requests/${params.id}`),
                HydrateFallback: <Loader />,
                element: <PrivateRoutes><DonationRequestDetails /></PrivateRoutes>
            },
            {
                path: '/blog-details/:id',
                loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_API}/blogs/${params.id}`),
                hydrateFallbackElement: <Loader />,
                element: <PrivateRoutes><BlogDetails /></PrivateRoutes>
            },
            {
                path: '/funding',
                element: <PrivateRoutes><Fund /></PrivateRoutes>
            },
            {
                path: '/add-fund',
                element: <PrivateRoutes><AddFund /></PrivateRoutes>
            },
            {
                path: '/how-it-works',
                Component: HowItWorks
            },
            {
                path: '/forbidden',
                Component: Forbidden
            },
            {
                path: '/about-us',
                Component: AboutUs
            },
            {
                path: '/news',
                Component: News
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
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
                HydrateFallback: <Loader />,
                Component: EditDonationRequest
            },
            {
                path: 'all-users',
                Component: AllUsers
            },
            {
                path: 'all-donations',
                Component: AllDonations
            },
            {
                path: "content-management",
                Component: ContentManagement
            },
            {
                path: 'content-management/add-blog',
                Component: AddBlog
            },
            // {
            //     path: 'add-fund',
            //     Component: AddFund
            // }

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