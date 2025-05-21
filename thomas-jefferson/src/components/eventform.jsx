import { useState, useEffect } from 'react';
import '../styles/eventForm.css';

export default function EventForm({ initialData = {}, onSubmit }) {
  // Set up form state with separate date and time fields
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    date: '',
    startTime: '',
    endTime: '',
  });

  // If initialData is provided, parse the date and times
  useEffect(() => {
    if (initialData.start) {
      const startDate = new Date(initialData.start);
      const endDate = new Date(initialData.end);
      
      setForm(prev => ({
        ...prev,
        title: initialData.title || '',
        description: initialData.description || '',
        date: startDate.toISOString().split('T')[0],
        startTime: startDate.toTimeString().slice(0, 5),
        endTime: endDate.toTimeString().slice(0, 5),
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the date and time fields into the expected format for the API
    const formattedStart = `${form.date} ${form.startTime}`;
    const formattedEnd = `${form.date} ${form.endTime}`;
    
    onSubmit({
      id: initialData.id || Date.now(), // Use existing ID or generate one
      title: form.title,
      description: form.description,
      start: formattedStart,
      end: formattedEnd,
    });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Event Title</label>
        <input 
          id="title"
          name="title" 
          placeholder="Enter event title" 
          value={form.title} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea 
          id="description"
          name="description" 
          placeholder="Add event details" 
          value={form.description} 
          onChange={handleChange}
          rows="3" 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input 
          id="date"
          type="date" 
          name="date" 
          value={form.date} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startTime">Start Time</label>
          <input 
            id="startTime"
            type="time" 
            name="startTime" 
            value={form.startTime} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="endTime">End Time</label>
          <input 
            id="endTime"
            type="time" 
            name="endTime" 
            value={form.endTime} 
            onChange={handleChange} 
            required 
          />
        </div>
      </div>
      
      <button type="submit">
        {initialData.id ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
}