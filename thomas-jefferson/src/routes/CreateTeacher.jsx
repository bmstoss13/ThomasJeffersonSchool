import { useNavigate } from 'react-router-dom';
import TeacherForm from '../components/TeacherForm';
import { addTeacher } from '../utils/CRUDteachers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import Header from '../components/header';

export default function CreateTeacher() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await addTeacher(data);
    navigate('/teachers');
  };

  return (

    <>
    <Header/>
    <div style={{  padding: '2rem', marginTop: '11rem' }}>
      <div style={{ textAlign: 'left' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/teachers')}
          sx={{ mb: 2, backgroundColor: '#715B68', color: 'white', '&:hover': { backgroundColor: '#095256' } }}
          variant="contained"
        >
          Back to Teachers
        </Button>
        </div>
      <h2>Create New Teacher</h2>
      <TeacherForm onSubmit={handleCreate} />
    </div>
    </>
    
  );
}