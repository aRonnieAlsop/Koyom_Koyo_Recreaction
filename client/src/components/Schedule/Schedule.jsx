import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Schedule.css';
import ProgramSignup from '../ProgramSignup/ProgramSignup'; // Import the form component

const localizer = momentLocalizer(moment);

const Schedule = () => {
    const [events, setEvents] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null); // Store selected event

    useEffect(() => {
        fetch('http://localhost:5000/programs')
            .then(response => response.json())
            .then(data => {
                const formattedEvents = formatEvents(data);
                setEvents(formattedEvents);
            })
            .catch(error => console.error('Error fetching programs:', error));
    }, []);

    const formatEvents = (programs) => {
        let events = [];

        programs.forEach(program => {
            const startDateTime = moment(`${program.start_date}T${program.start_time}`).toDate();
            const endDateTime = moment(`${program.start_date}T${program.end_time}`).toDate();

            // Add the first occurrence
            events.push({
                id: program.id,
                title: program.name,
                start: startDateTime,
                end: endDateTime,
                location: program.location,
                description: program.description,
            });

            // Handle recurring events
            if (program.repeats && program.repeat_type === "weekly") {
                for (let i = 1; i <= program.repeat_count; i++) {
                    const recurringStart = moment(startDateTime).add(i, 'weeks').toDate();
                    const recurringEnd = moment(endDateTime).add(i, 'weeks').toDate();
                    events.push({
                        id: `${program.id}-repeat-${i}`,
                        title: program.name,
                        start: recurringStart,
                        end: recurringEnd,
                        location: program.location,
                        description: program.description,
                    });
                }
            }
        });

        return events;
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '5px',
            padding: '5px',
            border: 'none',
        };
        return { style };
    };

    const handleEventClick = (event) => {
        setSelectedProgram(event);
    };

    return (
        <div className="schedule-container">
            <h2>Upcoming Events</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                views={['month', 'week', 'day']}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleEventClick}
            />

            {selectedProgram && (
                <div className="event-details">
                    <h3>{selectedProgram.title}</h3>
                    <p><strong>Time:</strong> {moment(selectedProgram.start).format('hh:mm A')} - {moment(selectedProgram.end).format('hh:mm A')}</p>
                    <p><strong>Location:</strong> {selectedProgram.location}</p>
                    <p><strong>Description:</strong> {selectedProgram.description}</p>
                    <ProgramSignup programId={selectedProgram.id} />
                </div>
            )}
        </div>
    );
};

export default Schedule;
