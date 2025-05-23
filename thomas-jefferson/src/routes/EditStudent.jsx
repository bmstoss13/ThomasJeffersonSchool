import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { getStudent, updateStudent } from '../utils/CRUDstudents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import Header from '../components/header';


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
    navigate(-1);
  };

  return (
    <>
      <Header/>
      <div style={{ padding: '2rem', marginTop: '11rem'}}>
        <div style={{ textAlign: 'left' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/students')}
            sx={{ mb: 2, backgroundColor: '#715B68', color: 'white', '&:hover': { backgroundColor: '#095256' } }}
            variant="contained"
          >
            Back to Students
          </Button>
          </div>
      <h2>Edit Student</h2>
      {initial ? (
        <StudentForm initialData={initial} onSubmit={handleUpdate} />
      ) : (
        <p>Loading…</p>
      )}
      </div>
    </>
    
  );
}