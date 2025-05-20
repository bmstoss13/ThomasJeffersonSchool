import React from 'react'
import Header from '../components/header'
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createViewWeek, createViewMonthGrid} from "@schedule-x/calendar";
import '@schedule-x/theme-default/dist/calendar.css';

const calendar = () => {

  const calendar = useCalendarApp({
    views: [
        createViewWeek(),
        createViewMonthGrid()
    ],
    events: [
        {
            id: 1, 
            title: 'School Entrance Ceremony',
            start: '2025-01-01 00:00',
            end: '2025-01-01 02:00',
        }       
    ],
    selectedDate: '2025-01-01',
    theme: 'dark',
  });
  return (
    <>
        <Header/>
        <div>
            <ScheduleXCalendar calendarApp={calendar}/>    
            
        </div>
    </>
  )
}

export default calendar