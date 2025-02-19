import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Schedule.css';

const localizer = momentLocalizer(moment);

const Schedule = () => {
    const [events, setEvents] = useState([]);

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

            // add the first occurrence:
            events.push({
                id: program.id,
                title: program.name,
                start: startDateTime,
                end: endDateTime,
                location: program.location,
                description: program.description,
            });

            // handles recurring events:
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
        alert(`Event: ${event.title}\nTime: ${moment(event.start).format('hh:mm A')} - ${moment(event.end).format('hh:mm A')}\nLocation: ${event.location}\nDescription: ${event.description}`);
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
        </div>
    );
};

export default Schedule;
