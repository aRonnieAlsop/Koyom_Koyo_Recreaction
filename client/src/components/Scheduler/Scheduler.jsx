import React, { useState } from 'react';

const Scheduler = () => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to add the event to the calendar

        console.log('New Event:', { title, start, end });
    };

    return (
        <div>
            <h2>Schedule an Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event Title: </label>
                        <input  
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <label>Start Date & Time:</label>
                        <input 
                            type="datetime-local"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            required
                        />
                </div>
                <div>
                    <label>End Date & Time:</label>
                    <input  
                        type="datetime-local"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Event</button>
            </form>
        </div>
    );
};

export default Scheduler;