import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Schedule.css';

const localizer = momentLocalizer(moment);

const events = [
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
];

const Schedule = () => {
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