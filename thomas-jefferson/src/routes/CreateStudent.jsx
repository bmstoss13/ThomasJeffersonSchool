import { useNavigate, useSearchParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { addStudent } from '../utils/CRUDstudents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import Header from '../components/header';
import { updateClass, getClassById } from '../utils/CRUDclasses';
import { doc } from 'firebase/firestore';
import { db } from '../firebase';


export default function CreateStudent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const classId = searchParams.get('classId');

  const handleCreate = async (data) => {
    try{
      if (classId) {
        data.class_id = classId;
      }

      const studentRef = await addStudent(data)
      if (classId && studentRef) {
        const classData = await getClassById(classId);
        if(classData) {
          const existingStudents = classData.student || [];
          const studentRefPath = `students/${studentRef.id}`
          const updatedStudentRefs = [...existingStudents, studentRefPath]
          await updateClass(classId, { student: updatedStudentRefs })

        }
      }

      if(classId) {
        navigate(`/class/${classId}`)
      }

      else{
        navigate(-1);
      }
    } 
    catch(e){
      console.error("Error creating student:", e)

    }
    // await addStudent(data);
    // navigate(-1);
  };

  return (
    <>
     <Header/>
    {/* i want to center the following student form */}
    <div style={{ padding: '2rem', marginTop: '11rem' }}>
      <div style={{ textAlign: 'left' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2, backgroundColor: '#715B68', color: 'white', '&:hover': { backgroundColor: '#095256' } }}
          variant="contained"
        >
          Back to Students
        </Button>
        </div>
      <h2>Create New Student</h2>
      <StudentForm onSubmit={handleCreate} />
    </div>
    </>
  );
}