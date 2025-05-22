import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 
import '../styles/StudentForm.css';

export default function ClassForm({ initialData = {}, onSubmit }) {
  const [teachers, setTeachers] = useState([])
  const [form, setForm] = useState({
    teacher: '',
    grade: '',
    room: '',
    // students: '',
    // student_ids: '',
    ...initialData,
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      const snapshot = await getDocs(collection(db, 'teachers'));
      const teacherList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeachers(teacherList);
    };

    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const parsedStudents = form.student_ids
    //   .split(',')
    //   .map((id) => id.trim())
    //   .filter(Boolean)
    //   .map((id) => `/students/${id}`);

    onSubmit({
      teacher: `/teacher/${form.teacher}`,
      grade: form.grade,
      room: Number(form.room),
      // students: parsedStudents.length,
      // student: parsedStudents, 
    });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <label>
        Select Teacher:
        <select
          name="teacher"
          value={form.teacher}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            -- Select a teacher --
          </option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.first_name} {t.last_name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Grade Level:
        <select
          name="grade"
          value={form.grade}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            -- Select grade --
          </option>
          <option value="K">K</option>
          {[1, 2, 3, 4, 5, 6].map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </label>

      <label>
        Room Number:
        <input
          name="room"
          type="number"
          placeholder="Room number"
          value={form.room}
          onChange={handleChange}
          required
        />
      </label>

      {/* <label>
        Student IDs (comma-separated):
        <input
          name="student_ids"
          placeholder="e.g. 123, 456"
          value={form.student_ids}
          onChange={handleChange}
        />
      </label> */}

      <button type="submit">Save</button>
    </form>
  );
}
