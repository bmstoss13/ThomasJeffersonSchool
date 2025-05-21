import { useNavigate } from 'react-router-dom';
import TeacherForm from '../components/TeacherForm';
import { addTeacher } from '../utils/CRUDteachers';

export default function CreateTeacher() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await addTeacher(data);
    navigate('/teachers');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create New Teacher</h2>
      <TeacherForm onSubmit={handleCreate} />
    </div>
  );
}