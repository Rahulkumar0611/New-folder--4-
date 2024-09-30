import React from 'react';
import { Navigate } from 'react-router-dom';

function Protect({ Child }) {

    const isAdmin = () => {
        return localStorage.getItem("Admin") !== null;
    };
    const isSuperAdmin = () => {
        return localStorage.getItem("superAdmin") !== null; // Match the case here
    };

    return (
        <div>
            {isSuperAdmin() ? <Child /> : isAdmin() ? <Child /> : <Navigate to="/" />}
        </div>
    );
}

export default Protect;
