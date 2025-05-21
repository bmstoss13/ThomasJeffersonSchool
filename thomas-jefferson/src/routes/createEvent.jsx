import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { addStudent } from '../utils/CRUDstudents';

export default function CreateEvent() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await addEvent(data);  {/* <-- make sure to actually make this function later lol */}
    navigate('/calendar');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create New Student</h2>
      <StudentForm onSubmit={handleCreate} />
    </div>
  );
}