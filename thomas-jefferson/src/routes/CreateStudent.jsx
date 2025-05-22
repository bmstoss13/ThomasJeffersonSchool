import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { addStudent } from '../utils/CRUDstudents';
import Header from '../components/header';

export default function CreateStudent() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await addStudent(data);
    navigate('/students');
  };

  return (
    <>
      <Header/>
      {/* i want to center the following student form */}
      <div style={{ padding: '2rem', marginTop: '11rem'}}>
        <h2>Create New Student</h2>
        <StudentForm onSubmit={handleCreate} />
      </div>
    </>
    
  );
}