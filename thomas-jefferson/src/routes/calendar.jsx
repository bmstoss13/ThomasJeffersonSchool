import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/header';
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '../styles/eventForm.css';
import { useNavigate } from 'react-router-dom';
import { getAllEvents } from '../utils/CRUDevents';

function Calendar() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  // Get current date
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  const [showDebug, setShowDebug] = useState(false);
  const eventsServicePlugin = createEventsServicePlugin();

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
      eventsServicePlugin.set(formattedEvents); // ← THIS is the key line

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
      eventsServicePlugin,
    ]
  });

  // Store calendar reference
  useEffect(() => {
    if (calendar) {
      calendarRef.current = calendar;
    }
  }, [calendar]);

  // Effect that runs whenever events are updated
  useEffect(() => {
    // Note: This specific line is not needed since we're already passing events to useCalendarApp
    // This is just here for reference on how to update events if needed in the future
    console.log("Events updated, calendar will re-render");
  }, [events]);

  return (
    <>
      <div>
        <Header/>
        <div style={{ marginBottom: '60px' }}></div>
        
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <button 
            onClick={() => navigate('/calendar/cevent')}
            style={{
              padding: '10px 20px',
              background: '#095256',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Create Event
          </button>
        <button 
            onClick={() => setShowDebug(!showDebug)}
            style={{
              padding: '10px 20px',
              background: '#715B68',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            {showDebug ? 'Hide' : 'Show'} Debug Data
          </button>
        </div>
        
        {/* Debug Display */}
        {showDebug && (
          <div style={{ 
            margin: '20px auto',
            padding: '15px', 
            backgroundColor: '#f5f5f5', 
            border: '1px solid #ddd',
            borderRadius: '4px',
            maxWidth: '800px',
            overflowX: 'auto'
          }}>
            <h3>Events Data ({events.length} events)</h3>
            <pre style={{ 
              backgroundColor: '#222', 
              color: '#26c95e',
              padding: '10px',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              {JSON.stringify(events, null, 2)}
            </pre>
          </div>
        )}
        
        {/* Only render calendar when events are loaded */}
        <div style={{ padding: '0 20px' }}>
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      </div>
    </>
  );
}

export default Calendar;