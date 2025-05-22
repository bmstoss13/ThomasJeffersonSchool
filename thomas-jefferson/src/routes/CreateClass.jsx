import { useNavigate } from 'react-router-dom';
import ClassForm from '../components/ClassForm';
import { addClass } from '../utils/CRUDclasses';

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
    <div style={{ padding: '2rem' }}>
      <h2>Create New Class</h2>
      <ClassForm onSubmit={handleCreate} />
    </div>
  );
}
