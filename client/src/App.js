import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home.jsx';
import NavBar from './components/NavBar/NavBar';
import Schedule from './components/Schedule/Schedule.jsx';
import Scheduler from './components/Scheduler/Scheduler.jsx';

function App() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Load events from localStorage when the component mounts
    useEffect(() => {
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    }, []);

    const addEvent = (event) => {
        setEvents((prevEvents) => {
            const updatedEvents = [...prevEvents, event];
            localStorage.setItem('events', JSON.stringify(updatedEvents)); // Save to local storage
            return updatedEvents;
        });
    };

    const deleteEvent = (eventToDelete) => {
        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.filter(event => event !== eventToDelete);
            localStorage.setItem('events', JSON.stringify(updatedEvents)); // Save to local storage
            return updatedEvents;
        });
    };

    const editEvent = (updatedEvent) => {
        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.map(event => event === selectedEvent ? updatedEvent : event);
            localStorage.setItem('events', JSON.stringify(updatedEvents)); // Save to local storage
            return updatedEvents;
        });
    };

    return (
        <div>
            <NavBar />
            {window.location.pathname === '/' && <Header />}
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/schedule" element={<Schedule events={events}/>} />
                    <Route path="/scheduler" element={<Scheduler events={events} addEvent={addEvent} deleteEvent={deleteEvent} editEvent={editEvent} />} />
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


