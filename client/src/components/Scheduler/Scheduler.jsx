import React, { useState, useEffect } from 'react';
import './Scheduler.css'; 

const Scheduler = ({ events, addEvent, deleteEvent, editEvent }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        if (selectedEvent) {
            setTitle(selectedEvent.title);
            setStart(formatDate(selectedEvent.start));
            setEnd(formatDate(selectedEvent.end));
        }
    }, [selectedEvent]);

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value) {
            const filteredSuggestions = filteredEvents.filter(event =>
                event.title.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (event) => {
        setSearch(event.title);
        setTitle(event.title);
        setStart(formatDate(event.start));
        setEnd(formatDate(event.end));
        setSelectedEvent(event);
        setSuggestions([]);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toISOString().slice(0, 16); // Format to YYYY-MM-DDTHH:MM
    };

    const convertToUTC = (localDateTime) => {
        return new Date(localDateTime).toISOString();
    };

    const convertToLocalDateTime = (utcDateTime) => {
        const localDate = new Date(utcDateTime);
        return localDate.toISOString().slice(0, 16);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = { title, 
            start: convertToUTC(start), 
            end: convertToUTC(end)
         };

        console.log("Submitting Event:", {
            title,
            start: newEvent.start,
            end: newEvent.end,
            selectedEvent
        });

        if (selectedEvent) {
            // Update the existing event
            editEvent({ ...selectedEvent, ...newEvent });
        } else {
            // Add a new event
            addEvent(newEvent);
        }

        // Reset form fields
        setTitle('');
        setStart('');
        setEnd('');
        setSelectedEvent(null);
        setSearch('');
    };

    const handleEdit = (event) => {
        if (!event.start || !event.end) {
            console.error("Event data is incomplete:", event);
            return;
        }
    
        setSelectedEvent(event);
        setTitle(event.title);
        setStart(convertToLocalDateTime(event.start));
        setEnd(convertToLocalDateTime(event.end));
    };

    const handleDelete = () => {
        if (selectedEvent) {
            console.log("Deleting Event:", selectedEvent);
            deleteEvent(selectedEvent);
            setSelectedEvent(null);
            setTitle('');
            setStart('');
            setEnd('');
            setSearch('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab' && suggestions.length > 0) {
            e.preventDefault();
            handleSelectSuggestion(suggestions[0]); // Auto-complete with the first suggestion
        }
    };

    return (
        <div className="scheduler-container">
            <h2>Schedule an Event</h2>
            <form className="scheduler-form" onSubmit={handleSubmit}>
                <div>
                    <label>Search Events: </label>
                    <input  
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type to search..."
                    />
                </div>
                {suggestions.length > 0 && (
                    <ul className="suggestions-dropdown">
                        {suggestions.map((event) => (
                            <li key={event.id} onClick={() => handleSelectSuggestion(event)}>
                                {event.title}
                            </li>
                        ))}
                    </ul>
                )}
                <div>
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
        </div>
    );
};

export default Scheduler;
