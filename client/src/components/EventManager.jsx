import React, { useState } from 'react';
import Schedule from './Schedule/Schedule';
import Schedule from './Schedule/Schedule';

const EventManager = () => {
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
        setEvents([...events, newEvent]);
    };

    return (
        <div>
            <Scheduler addEvent={addEvent} />
            <Schedule events={events} />
        </div>
    );
};

export default EventManager;
