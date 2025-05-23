import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { addStudent } from '../utils/CRUDstudents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

export default function CreateStudent() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await addStudent(data);
    navigate('/students');
  };

  return (
    <div style={{ padding: '2rem' }}>
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
      <h2>Create New Student</h2>
      <StudentForm onSubmit={handleCreate} />
    </div>
  );
}