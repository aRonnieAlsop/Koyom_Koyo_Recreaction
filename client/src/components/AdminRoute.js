import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const AdminRoute = ({ children }) => {
    const { user, isAuthenticated } = useAuth0();

    const isAdmin = isAuthenticated && user && user['https://your-app.com/roles']?.includes('admin');

    return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
