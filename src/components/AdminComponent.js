import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminComponent = () => {
    const auth = localStorage.getItem('user');
    if (auth && JSON.parse(auth).role === 'admin') {
        return <Outlet />
    }
    return <Navigate to="/events" />
}

export default AdminComponent;
