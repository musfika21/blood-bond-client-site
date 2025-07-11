import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../CustomHooks/useAuth';
import Loader from '../shared/Loader';

const PrivateRoutes = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate state={location?.pathname} to='/login-user'></Navigate>
    }

    return children;
};

export default PrivateRoutes;