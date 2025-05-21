import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { addStudent } from '../utils/CRUDstudents';

export default function CreateStudent() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await addStudent(data);
    navigate('/students');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create New Student</h2>
      <StudentForm onSubmit={handleCreate} />
    </div>
  );
}