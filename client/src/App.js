import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home.jsx';
import NavBar from './components/NavBar/NavBar';
import Schedule from './components/Schedule/Schedule.jsx';
import Scheduler from './components/Scheduler/Scheduler.jsx';


function App() {
    const [events, setEvents] = useState([
        {
            title: 'Community Yoga',
            start: new Date(2024, 7, 26, 9, 0),
            end: new Date(2024, 7, 26, 11, 0),
        },
        {
            title: 'Outdoor Movie Night',
            start: new Date(2024, 7, 28, 20, 0),
            end: new Date(2024, 7, 28, 22, 0),
        },
    ]);

    const addEvent = (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        console.log("New event added:", newEvent);
        console.log("Updated events array:", [...events, newEvent]);
    };
    return (
        <div>
            <NavBar />
            {window.location.pathname === '/' && <Header />}
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/schedule" element={<Schedule events={events}/>} />
                    <Route path="/scheduler" element={<Scheduler addEvent={addEvent} />}/>
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


