import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const Scheduler = ({ events, addEvent, deleteEvent, editEvent }) => {
    console.log('Scheduler rendered');
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [search, setSearch] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    // const navigate = useNavigate();

    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedEvent) {
            editEvent({ ...selectedEvent, title, start: new Date(start), end: new Date(end) });
        } else {
            const newEvent = { title, start: new Date(start), end: new Date(end) };
            addEvent(newEvent);
        }
        setTitle('');
        setStart('');
        setEnd('');
        setSelectedEvent(null);
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setTitle(event.title);
        setStart(event.start.toISOString().slice(0, 16));
        setEnd(event.end.toISOString().slice(0, 16));
    };

    const handleDelete = () => {
        if (selectedEvent) {
            deleteEvent(selectedEvent);
            setSelectedEvent(null);
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