import { useState } from 'react';
import '../styles/StudentForm.css';

export default function TeacherForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    birthday: '',
    email: '',
    phone_number: '',
    grade_level: '',
    class_ids: '',
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      class_ids: form.class_ids
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean),
    });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <input name="first_name" placeholder="First name" value={form.first_name} onChange={handleChange} required />
      <input name="last_name" placeholder="Last name"  value={form.last_name} onChange={handleChange} required />
      <input type="date" name="birthday" value={form.birthday} onChange={handleChange} required />
      <input name="email" placeholder="email" value={form.email} onChange={handleChange} required />
      <input name="phone_number" placeholder="Phone number" value={form.phone_number} onChange={handleChange} required />
      <input name="grade_level" placeholder="Grade level you teach(e.g. 3)" value={form.grade_level} onChange={handleChange} required />
      <input name="class_ids" placeholder="Class IDs (comma-separated)" value={form.class_ids} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
}