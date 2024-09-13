import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home.jsx';
import NavBar from './components/NavBar/NavBar';
import Schedule from './components/Schedule/Schedule.jsx';
import Scheduler from './components/Scheduler/Scheduler.jsx';
import './App.css';

function App() {
    const [events, setEvents] = useState([]);
    const location = useLocation();

    // Load events from localStorage when the component mounts
    useEffect(() => {
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    }, []);

    const addEvent = (event) => {
        setEvents((prevEvents) => {
            const updatedEvents = [...prevEvents, { ...event, id: Date.now() }]; // Add unique ID
            localStorage.setItem('events', JSON.stringify(updatedEvents)); // Save to local storage
            return updatedEvents;
        });
    };

    const deleteEvent = (eventToDelete) => {
        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.filter(event => event.id !== eventToDelete.id);
            localStorage.setItem('events', JSON.stringify(updatedEvents)); // Save to local storage
            return updatedEvents;
        });
    };

    const editEvent = (updatedEvent) => {
        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.map(event =>
                event.id === updatedEvent.id ? updatedEvent : event
            );
            localStorage.setItem('events', JSON.stringify(updatedEvents)); // Save to local storage
            return updatedEvents;
        });
    };

    return (
        <div className="app-container">
            <NavBar />
            {window.location.pathname === '/' && <Header />}
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/schedule" element={<Schedule events={events} />} />
                    <Route path="/scheduler" element={<Scheduler events={events} addEvent={addEvent} deleteEvent={deleteEvent} editEvent={editEvent}  />} />
                </Routes>
            </main>
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


