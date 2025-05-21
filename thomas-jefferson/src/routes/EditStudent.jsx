import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { getStudent, updateStudent } from '../utils/CRUDstudents';

export default function EditStudent() {
  const { id } = useParams();
  const [initial, setInitial] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getStudent(id).then((data) => {
      if (data) {
        data.class_ids = (data.class_ids || []).join(', ');
        setInitial(data);
      }
    });
  }, [id]);

  const handleUpdate = async (updated) => {
    await updateStudent(id, updated);
    navigate('/students');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Edit Student</h2>
      {initial ? (
        <StudentForm initialData={initial} onSubmit={handleUpdate} />
      ) : (
        <p>Loading…</p>
      )}
    </div>
  );
}