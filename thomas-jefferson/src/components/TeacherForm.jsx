import { useState, useEffect } from 'react';
import { getAllClasses } from '../utils/CRUDteachers';
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

  const[errors, setErrors] = useState({})
  const [isLoadingClasses, setIsLoadingClasses] = useState(true)
  const [classes, setClasses] = useState([])

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const availableClasses = await getAllClasses();
        setClasses(availableClasses);
      } 
      catch(err){
        console.error('Error loading classes:', err);
        setErrors(prev => ({ ...prev, general: 'Failed to load available classes' }));
      } 
      finally{
        setIsLoadingClasses(false);
      }
    };

    loadClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {

      if (name === 'grade_level') {
        return { ...prev, grade_level: value, class_id: '' };
      }
      return { ...prev, [name]: value };
    })
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: ''}))
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const filteredClasses = classes.filter(
    (cls) => String(cls.grade) === String(form.grade_level)
  )

    return (
        <form className="student-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <label htmlFor="first_name">First Name:</label>
                <input id="first_name" name="first_name" value={form.first_name} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="last_name">Last Name:</label>
                <input id="last_name" name="last_name" value={form.last_name} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="birthday">Birthday:</label>
                <input type="date" id="birthday" name="birthday" value={form.birthday} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="phone_number">Phone Number:</label>
                <input id="phone_number" name="phone_number" value={form.phone_number} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="grade_level">Grade Level:</label>
                <input id="grade_level" name="grade_level" value={form.grade_level} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="class_id">Select Class:</label>
                {isLoadingClasses ? (
                    <p>Loading classes...</p>
                ) : (
                    <select id="class_id" name="class_id" value={form.class_id} onChange={handleChange} required disabled={!form.grade_level}>
                        <option value="">{form.grade_level ? '-- Select a class --' : 'Select grade level first'}</option>
                        {filteredClasses.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                                {`ID: ${cls.class_id}, Room: ${cls.room}`}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            {errors.class_id && <p className="error">{errors.class_id}</p>}

        <button type="submit">Save</button>
    </form>

  );
}