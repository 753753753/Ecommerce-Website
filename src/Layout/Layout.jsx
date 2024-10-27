import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Home/Footer/Footer';
import Header from '../Component/Home/Header/Header';

function Layout() {
    return (
        <div>
            <Header /> 
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;
