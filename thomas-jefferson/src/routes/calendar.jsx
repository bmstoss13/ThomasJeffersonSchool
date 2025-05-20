import React from 'react';
import Header from '../components/header';
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createViewWeek, createViewMonthGrid} from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css'
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';


function calendar(){

    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    console.log(formattedToday);
    const calendar = useCalendarApp({
      views:[
        createViewWeek(),
        createViewMonthGrid()
      ],
      events: [
        {
          id: 1, 
          title: 'My new event',
          description: 'this is my event description',
          start: '2025-01-01 00:00',
          end: '2025-01-01 02:00'
        }
      ],
      selectedDate: formattedToday,
      plugins:[
        createEventModalPlugin(),
        createDragAndDropPlugin()
      ]
    })

  return(
    <>
      <div>
        <Header/>
        <div style={{ marginBottom: '60px' }}> </div> {/* <-- added this for spacing, couldn't think of a better way*/}
        <button >Create Event</button>
        <ScheduleXCalendar calendarApp={calendar}/>
        
      </div>
    </>
  )
}

export default calendar;