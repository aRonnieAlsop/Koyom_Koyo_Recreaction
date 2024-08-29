import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth0ProviderWithHistory from './context/Auth0ProviderWithHistory.js';
import Header from './components/Header/Header';
import Home from './components/Home/Home.jsx';
import NavBar from './components/NavBar/NavBar';
import Schedule from './components/Schedule/Schedule.jsx';
import Scheduler from './components/Scheduler/Scheduler.jsx';
import Footer from './components/Footer/Footer.jsx';
import AdminRoute from './components/AdminRoute.js';

function App() {
    return (
        <div>
            <NavBar />
            {window.location.pathname === '/' && <Header />}
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route 
                        path="/scheduler"
                        element={
                            <AdminRoute>
                                <Scheduler />
                            </AdminRoute>
                        }
                    />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <Auth0ProviderWithHistory>
                <App />
            </Auth0ProviderWithHistory>
        </Router>
    );
}

