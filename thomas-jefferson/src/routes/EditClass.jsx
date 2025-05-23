import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClassForm from '../components/ClassForm';
import { getClassById, updateClass } from '../utils/CRUDclasses';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
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

const handleUpdate = async (data) => {
    try {
      await updateClass(id, data);
      navigate('/classes');
    } catch (err) {
      console.error("Failed to update class:", err);
    }
  };

  return (
    <>
    <Header />
      <div style={{  padding: '2rem',  marginTop: '11rem'  }}>
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
    </>
  );

  
}
