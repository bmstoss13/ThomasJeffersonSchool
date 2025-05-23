import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClassForm from '../components/ClassForm';
import { getClassById, updateClass } from '../utils/CRUDclasses';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';


export default function EditClass() {
  const { id } = useParams();
  const [initial, setInitial] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getClassById(id).then((data) => {
      if (data) {
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
    navigate('/classes');
  };

  return (
    <div style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'left' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/classes')}
          sx={{ mb: 2, backgroundColor: '#715B68', color: 'white', '&:hover': { backgroundColor: '#095256' } }}
          variant="contained"
        >
          Back to Classes
        </Button>
        </div>
        
      <h2>Edit Class</h2>
      {initial ? (
        <ClassForm initialData={initial} onSubmit={handleUpdate} />
      ) : (
        <p>Loading…</p>
      )}
    </div>
  );

  
}
