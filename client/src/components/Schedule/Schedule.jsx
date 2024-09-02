import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Schedule.css';

const localizer = momentLocalizer(moment);

const Schedule = ({ events }) => {
    console.log("Events received in Schedule:", events);
    
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
            />
        </div>
    );
};

export default Schedule;