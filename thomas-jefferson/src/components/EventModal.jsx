import React, { useState, useEffect } from 'react';
import { updateEvent, deleteEvent } from '../utils/CRUDevents';
import '../styles/eventModal.css';

export default function EventModal({ calendarEvent, calendarApi, onClose }) {
  if (!calendarEvent) return null;
  
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState({
    title: calendarEvent.title || 'Untitled Event',
    description: calendarEvent.description || '',
    start: formatDateTimeForInput(calendarEvent.start),
    end: formatDateTimeForInput(calendarEvent.end)
  });
  
  // For debugging
  console.log("EventModal render state:", { isEditing, calendarEvent, eventData });

  // Reset form data when calendarEvent changes
  useEffect(() => {
    if (calendarEvent) {
      setEventData({
        title: calendarEvent.title || 'Untitled Event',
        description: calendarEvent.description || '',
        start: formatDateTimeForInput(calendarEvent.start),
        end: formatDateTimeForInput(calendarEvent.end)
      });
      // Reset editing state when viewing a different event
      setIsEditing(false);
    }
  }, [calendarEvent]);

  // Helper function to format datetime for input fields
  function formatDateTimeForInput(dateTimeStr) {
  try {
    const date = new Date(dateTimeStr);
    // Get local date components instead of UTC
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch (error) {
    console.error("Date formatting error:", error, dateTimeStr);
    return "";
  }
}

  // Helper function to format date for Firebase (matches your example format)
  function formatDateForFirebase(dateTimeStr) {
  try {
    const date = new Date(dateTimeStr);
    // Use local time components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Maintain local time in Firebase (append 'T00:00' if you need timezone info)
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  } catch (error) {
    console.error("Firebase date formatting error:", error, dateTimeStr);
    return dateTimeStr;
  }
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
    console.log("Input changed:", name, value);
  };

  const toggleEdit = () => {
    console.log("Toggle edit clicked, current isEditing:", isEditing);
    setIsEditing(prevState => !prevState);
  };

  const handleUpdate = async () => {
    try {
      console.log("Updating event with data:", eventData);
      
      // Format the dates for Firebase
      const updatedEvent = {
        ...calendarEvent,
        title: eventData.title,
        description: eventData.description,
        start: formatDateForFirebase(eventData.start),
        end: formatDateForFirebase(eventData.end)
      };

      // Update in Firebase
      await updateEvent(calendarEvent.id, {
        title: updatedEvent.title,
        description: updatedEvent.description,
        start: updatedEvent.start,
        end: updatedEvent.end
      });

      // Update in Calendar (via events service plugin)
      if (calendarApi && calendarApi.eventsService) {
        calendarApi.eventsService.update(updatedEvent);
      } else {
        console.error("Calendar API or events service not available");
      }

      setIsEditing(false);
      if (onClose) onClose(); // Close modal if needed
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        // Delete from Firebase
        await deleteEvent(calendarEvent.id);
        
        // Delete from Calendar (via events service plugin)
        if (calendarApi && calendarApi.eventsService) {
          calendarApi.eventsService.remove(calendarEvent.id);
        } else {
          console.error("Calendar API or events service not available");
        }
        
        if (onClose) onClose(); // Close modal if needed
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event. Please try again.");
      }
    }
  };
  
  // Render edit form regardless of isEditing state - for debugging only
  console.log("Rendering with isEditing:", isEditing);
  
  return (
  <div className="event-modal" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {isEditing ? (
      <div>
        <h2>Edit Event</h2>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Start:
          <input
            type="datetime-local"
            name="start"
            value={eventData.start}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End:
          <input
            type="datetime-local"
            name="end"
            value={eventData.end}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    ) : (
      <div>
        <h2>{calendarEvent.title}</h2>
        <p><strong>Description:</strong> {calendarEvent.description}</p>
        <p><strong>Start:</strong> {calendarEvent.start}</p>
        <p><strong>End:</strong> {calendarEvent.end}</p>
        <button onClick={(e) => { e.stopPropagation(); toggleEdit(); }}>Edit</button>
        <button onClick={(e) => { e.stopPropagation(); handleDelete(); }}>Delete</button>
        {/* <button onClick={(e) => { e.stopPropagation(); onClose(); }}>Close</button> */}
      </div>
    )}
    </div>
  </div>
);
}