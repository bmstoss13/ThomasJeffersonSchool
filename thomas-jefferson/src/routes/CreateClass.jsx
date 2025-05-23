import { useNavigate } from 'react-router-dom';
import ClassForm from '../components/ClassForm';
import { addClass } from '../utils/CRUDclasses';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import Header from '../components/header';

export default function CreateClass() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    const classData = {
      ...data,
      student: []
  }
  
  await addClass(classData);
  navigate('/classes');
};
  return (

    <>
    <Header/>
    <div style={{ padding: '2rem' , marginTop: '11rem'}}>
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

      <h2>Create New Class</h2>
      <ClassForm onSubmit={handleCreate} />
    </div>
    </>

  );
}
