// chuyển hướng routing
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 

const PrivateRoute = ({ children }) => {
    const token = Cookies.get('token'); 

    return token ? children : <Navigate to="/login" replace />; // Điều hướng đến trang đăng nhập nếu không có token
};

export default PrivateRoute;
