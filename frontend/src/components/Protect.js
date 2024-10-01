import React from 'react';
import { Navigate } from 'react-router-dom';

function Protect({ Child, requiredRole }) {
    const isAdmin = () => {
        return localStorage.getItem("Admin") !== null;
    };
    const isSuperAdmin = () => {
        return localStorage.getItem("superAdmin") !== null;
    };

    // Check user roles and redirect accordingly
    const hasAccess = () => {
        if (requiredRole === 'superadmin') {
            return isSuperAdmin();
        }
        if (requiredRole === 'admin') {
            return isAdmin();
        }
        return false;
    };

    return (
        <div>
            {hasAccess() ? <Child /> : <Navigate to="/" />}
        </div>
    );
}

export default Protect;
