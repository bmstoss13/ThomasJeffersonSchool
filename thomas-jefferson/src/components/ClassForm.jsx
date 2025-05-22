import { useState } from 'react';
import '../styles/StudentForm.css'; 

export default function ClassForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    teacher: '',
    grade: '',
    room: '',
    students: '',
    student_ids: '',
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedStudents = form.student_ids
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)
      .map((id) => `/students/${id}`);

    onSubmit({
      teacher: form.teacher,
      grade: Number(form.grade),
      room: Number(form.room),
      students: parsedStudents.length,
      student: parsedStudents, 
    });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <input
        name="teacher"
        placeholder="Teacher name"
        value={form.teacher}
        onChange={handleChange}
        required
      />
      <input
        name="grade"
        type="number"
        placeholder="Grade (e.g. 4)"
        value={form.grade}
        onChange={handleChange}
        required
      />
      <input
        name="room"
        type="number"
        placeholder="Room number"
        value={form.room}
        onChange={handleChange}
        required
      />
      <input
        name="student_ids"
        placeholder="Student IDs (comma-separated)"
        value={form.student_ids}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
}
