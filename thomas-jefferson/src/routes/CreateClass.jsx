import { useNavigate } from 'react-router-dom';
import ClassForm from '../components/ClassForm';
import { addClass } from '../utils/CRUDclasses';
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
      <div style={{ padding: '2rem',  marginTop: '11rem'}}>
        <h2>Create New Class</h2>
        <ClassForm onSubmit={handleCreate} />
      </div>
    </>
    
  );
}
