import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentViewForm from '../components/StudentViewForm';
import { getStudent } from '../utils/CRUDstudents';
import Header from '../components/header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

export default function ViewStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStudent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getStudent(id);
        
        if (data) {
          setStudent(data);
        } else {
          setError('Student not found');
        }
      } catch (err) {
        console.error('Error loading student:', err);
        setError('Failed to load student information');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadStudent();
    }
  }, [id]);

  const handleBack = () => {
    navigate('/students');
  };

  const handleEdit = () => {
    navigate(`/students/edit/${id}`);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ padding: '2rem', marginTop: '11rem', textAlign: 'center' }}>
          <p>Loading student information...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{ padding: '2rem', marginTop: '5rem' }}>
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
      <h2>View Student</h2>

          {student ? (
            <StudentViewForm studentData={student} />
          ) : (
            <p>No student data found.</p>
        )}
        </div>
    </>
  );
}