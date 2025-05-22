import { useNavigate } from 'react-router-dom';
import TeacherForm from '../components/TeacherForm';
import { addTeacher } from '../utils/CRUDteachers';
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
      <div style={{ padding: '2rem', marginTop: '11rem'}}>
      <h2>Create New Teacher</h2>
      <TeacherForm onSubmit={handleCreate} />
    </div>
    </>
    
  );
}