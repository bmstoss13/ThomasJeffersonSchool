import { useState, useEffect } from 'react';
import { getAllClasses } from '../utils/CRUDstudents';
import '../styles/StudentForm.css';

export default function StudentForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    first_name: '',
    last_name : '',
    birthday  : '',
    grade: '',
    class_id : '',
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

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: ''}))
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  // const filteredClasses = classes.filter(
  //   (cls) => String(cls.grade) === String(form.grade_level)
  // )

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="first_name">First Name:</label>
        <input name="first_name" placeholder="First name" value={form.first_name} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label htmlFor="last_name">Last Name:</label>
        <input name="last_name" placeholder="Last name"  value={form.last_name} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label htmlFor="birthday">Birthday:</label>
        <input type="date" name="birthday" value={form.birthday} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label htmlFor="grade">Grade:</label>
        <input name="grade" placeholder="Grade (e.g. 92)" value={form.grade} onChange={handleChange} required />
      </div>



      {/* {isLoadingClasses ? (<p>Loading classes...</p>) : (<select name="class_id" value={form.class_id} onChange={handleChange} required disabled={!form.grade_level}><option value=""> {form.grade_level ? '-- Select a class --' : 'Select grade level first'}</option> {filteredClasses.map((cls) => (<option key={cls.id} value={cls.id}>{cls.teacher}</option>))}</select>)}
      {errors.class_id && <p className="error">{errors.class_id}</p>} */}
      <button type="submit">Save</button>
    </form>
  );
}