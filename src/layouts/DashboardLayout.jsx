import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SecondarySidebar from '../components/SecondarySidebar';
import TopBar from '../components/TopBar';

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <SecondarySidebar />
            <main className="flex-1 ml-[336px] p-8">
                <TopBar />
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
