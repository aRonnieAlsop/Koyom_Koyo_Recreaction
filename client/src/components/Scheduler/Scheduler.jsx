import React, { useState } from 'react';

const Scheduler = ({ events, addEvent, deleteEvent, editEvent }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [search, setSearch] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);

    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedEvent) {
            // edit existing event
            editEvent({ ...selectedEvent, title, start: new Date(start), end: new Date(end) });
        } else {
            // add new event
            const newEvent = { title, start: new Date(start), end: new Date(end) };
            addEvent(newEvent);
        }
        // Reset form fields
        setTitle('');
        setStart('');
        setEnd('');
        setSelectedEvent(null);
    };

    const handleEdit = (event) => {
        if (!event.start || !event.end) {
            console.error("Event data is incomplete:", event);
            return;  // Exit if data is incomplete
        }
        
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);

        setSelectedEvent(event);
        setTitle(event.title);
        setStart(eventStart.toISOString().slice(0, 16));
        setEnd(eventEnd.toISOString().slice(0, 16));
    };

    const handleDelete = () => {
        if (selectedEvent) {
            deleteEvent(selectedEvent);
            setSelectedEvent(null);
            setTitle('');
            setStart('');
            setEnd('');
            setSearch('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab' && filteredEvents.length > 0) {
            e.preventDefault();
            handleEdit(filteredEvents[0]);  // Auto-complete with the first filtered event
        }
    };

    return (
        <div>
            <h2>Schedule an Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Search Events: </label>
                        <input  
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <label>Event Title:</label>
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                </div>
                <div>
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
                <button type="submit">{selectedEvent ? 'Update Event' : 'Add Event'}</button>
                {selectedEvent && <button type="button" onClick={handleDelete}>Delete Event</button>}
            </form>
            <h3>Search Results</h3>
            <ul>
                {filteredEvents.map((event, index) => (
                    <li key={index}>
                        <button onClick={() => handleEdit(event)}>
                            {event.title} ({event.start.toLocaleString()} - {event.end.toLocaleString()})
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Scheduler;