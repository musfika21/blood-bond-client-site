import React from 'react';
import { createBrowserRouter } from 'react-router';
import BasicLayout from '../Layouts/BasicLayout';
import Home from '../Pages/HomePage/Home';
import Register from '../Pages/Authentications/Register';
import Blog from '../Pages/Blog/Blog';

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
            }
        ]
    },
    {
        path: 'user-registration',
        Component: Register
    }
])

export default Router;