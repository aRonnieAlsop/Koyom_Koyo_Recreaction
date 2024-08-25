import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import Users from './components/Users';
import Header from './components/Header/Header';
import Home from './components/Home/Home.jsx';
import NavBar from './components/NavBar/NavBar';
import Schedule from './components/Schedule/Schedule.jsx';

function App() {
    return (
        <div>
            <NavBar />
            {window.location.pathname === '/' && <Header />}
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </div>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}




