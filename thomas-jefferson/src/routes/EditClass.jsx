import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClassForm from '../components/ClassForm';
import { getClassById, updateClass } from '../utils/CRUDclasses';
import Header from '../components/header';

export default function EditClass() {
  const { id } = useParams();
  const [initial, setInitial] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
  getClassById(id).then((data) => {
    if (data) {
      // console.log('Raw teacher data:', data.teacher, typeof data.teacher);
      
      // Handle both single and double prefix cases
      if (data.teacher) {
        // Remove all instances of '/teacher/' from the beginning
        data.teacher = data.teacher.replace(/^(\/teacher\/)+/, '');
      }
      
      // console.log('Processed teacher ID:', data.teacher);
      
      data.student = (data.student || []).map(ref => ref.id || '').join(', ');
      setInitial(data);
    }
  });
}, [id]);

  const handleUpdate = async (updated) => {
    updated.student = (updated.student || '')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);
    
    await updateClass(id, updated);
    navigate('-1');
  };

  return (
    <>
      <Header />
      <div style={{ padding: '2rem',  marginTop: '11rem' }}>
        <h2>Edit Class</h2>
        {initial ? (
          <ClassForm initialData={initial} onSubmit={handleUpdate} />
        ) : (
          <p>Loading…</p>
        )}
      </div>
    </>
    
  );
}
