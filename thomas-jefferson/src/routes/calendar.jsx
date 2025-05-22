import React, { useEffect, useState, useRef, useCallback } from 'react';
import Header from '../components/header';
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createCurrentTimePlugin } from '@schedule-x/current-time'
import '../styles/eventForm.css';
import '../styles/calendar.css'; // Import the new CSS file
import { useNavigate } from 'react-router-dom';
import { getAllEvents } from '../utils/CRUDevents';
import EventModal from '../components/EventModal';

function Calendar() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  // Get current date
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  const [showDebug, setShowDebug] = useState(false);
  const eventsServicePlugin = createEventsServicePlugin();

  // Custom component wrapper to pass calendar API
  const CustomEventModal = useCallback(
    (props) => {
      return <EventModal {...props} calendarApi={calendarRef.current} />;
    },
    []
  );

  // Fetch events from the backend
  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllEvents();
        console.log("Fetched events:", data);
        
        const formattedEvents = data.map(event => ({
          ...event,
          id: event.id.toString(),
          title: event.title || "Untitled Event",
          start: event.start,
          end: event.end,
          description: event.description || ""
        }));

        // Set events into state and directly into plugin
        setEvents(formattedEvents);
        eventsServicePlugin.set(formattedEvents);

      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  // Create calendar instance with the events
  const calendar = useCalendarApp({
    views: [
      createViewWeek(),
      createViewMonthGrid()
    ],
    events: [], // Pass the events directly
    selectedDate: formattedToday,
    plugins: [
      createEventModalPlugin(),
      createDragAndDropPlugin(),
      createCurrentTimePlugin(),
      eventsServicePlugin,
    ]
  });

  // Store calendar reference
  useEffect(() => {
    if (calendar) {
      calendarRef.current = calendar;
    }
  }, [calendar]);

  return (
    <div className="calendar-container">
      <Header/>
      
      <div className="calendar-wrapper">
        {/* Professional header section with centered title and button */}
        <div className="calendar-header">
          <h1 className="calendar-title">My Calendar</h1>
          <div>
            <button 
              className="create-event-btn"
              onClick={() => navigate('/calendar/cevent')}
            >
              Create Event
            </button>
            {/* Uncomment if you want the debug button */}
            {/* <button 
              className="debug-btn"
              onClick={() => setShowDebug(!showDebug)}
            >
              {showDebug ? 'Hide' : 'Show'} Debug Data
            </button> */}
          </div>
        </div>
        
        {/* Debug Display */}
        {showDebug && (
          <div className="debug-section">
            <h3>Events Data ({events.length} events)</h3>
            <pre>
              {JSON.stringify(events, null, 2)}
            </pre>
          </div>
        )}
        
        {/* Centered calendar content */}
        <div className="calendar-content">
          <ScheduleXCalendar 
            calendarApp={calendar} 
            customComponents={{
              eventModal: CustomEventModal
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Calendar;