import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherForm from '../components/TeacherForm';
import { getTeacher, updateTeacher } from '../utils/CRUDteachers';
import Header from '../components/header';

export default function EditTeacher() {
  const { id } = useParams();
  const [initial, setInitial] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTeacher(id).then((data) => {
      if (data) {
        // data.class_ids = (data.class_ids || []).join(', ');
        setInitial(data);
      }
    });
  }, [id]);

  const handleUpdate = async (updated) => {
    await updateTeacher(id, updated);
    navigate('/teachers');
  };

  return (
    <>
    <Header/>
      <div style={{ padding: '2rem', marginTop: '11rem'}}>
      <h2>Edit Teacher</h2>
      {initial ? (
        <TeacherForm initialData={initial} onSubmit={handleUpdate} />
      ) : (
        <p>Loading…</p>
      )}
      </div>
    </>
    
  );
}