import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Table, TableHead, TableBody, TableCell, TableRow, IconButton, Button, Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/header';
import { getClassById } from '../utils/CRUDclasses'; 
import { useNavigate } from 'react-router-dom';
import { deleteStudent, updateStudent } from '../utils/CRUDstudents';
import { getTeacher } from '../utils/CRUDteachers';



const ClassDetail = () => {
  const { id } = useParams();
  const [classInfo, setClassInfo] = useState(null); 
  const [teacherInfo, setTeacherInfo] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchClass = async () => {
      const data = await getClassById(id);
      setClassInfo(data);
    };
    fetchClass();
  }, [id]);

  useEffect(() => {
    const fetchTeacher = async () => {
      if (!classInfo?.teacher) return;
      const pathParts = classInfo.teacher.split('/');
      const teacherId = pathParts[pathParts.length - 1];
  
      const teacher = await getTeacher(teacherId);
      setTeacherInfo(teacher);
      // console.log(classInfo.students);
    };
  
    fetchTeacher();
  }, [classInfo]);
  
  if (!classInfo) return <div>Loading...</div>;

  const averageGrade = classInfo.students.length > 0 
  ? (() => {
      const validGrades = classInfo.students
        .map(student => student.grade)
        .filter(grade => grade != null && !isNaN(grade) && grade !== '');
      
      return validGrades.length > 0 
        ? validGrades.reduce((sum, grade) => sum + Number(grade), 0) / validGrades.length
        : 0;
    })()
  : 0;

  return (
    <div>
      <Header />
      <Box sx={{ mt: 4, px: 2, pt: 14, pb: 5, backgroundColor: '#EFD9CE', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', overflowX: 'hidden' }}>

        <Typography variant="h3" fontFamily='Segoe UI' fontWeight="bold" color="#095256">{teacherInfo ? `${teacherInfo.first_name} ${teacherInfo.last_name}` : 'Loading teacher...'}’s Class</Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>Overview of {teacherInfo ? `${teacherInfo.first_name} ${teacherInfo.last_name}` : 'Loading teacher...'}’s Class</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 0 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/classes')}
          sx={{ mb: 2, backgroundColor: '#715B68', color: 'white', '&:hover': { backgroundColor: '#095256' } }}
          variant="contained"
        >
          Back to Classes
        </Button>
        </Box>

        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Total Students</Typography>
              <Typography variant="h5">{classInfo.students.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Avg. Grade</Typography>
              <Typography variant="h5">{averageGrade.toFixed(1)} </Typography> 
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Grade</Typography>
              <Typography variant="h5">{classInfo.grade}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#715B68' }} startIcon={<AddIcon />} onClick={() => navigate(`/students/new?classId=${id}`)}>Add</Button>
        </Box>

        <Paper>
          <Table>
            <TableHead sx={{ backgroundColor: '#f2f2f2' }}>
              <TableRow>
                <TableCell><b>Student</b></TableCell>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>DOB</b></TableCell>
                <TableCell><b>Grade</b></TableCell>
                <TableCell align="right"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {classInfo.students.map((s, i) => (
                    <TableRow key={i}>
                    <TableCell>{s.first_name} {s.last_name}</TableCell>
                    <TableCell>{s.id || 'N/A'}</TableCell> 
                    <TableCell>{s.birthday}</TableCell>
                    <TableCell>{s.grade}</TableCell>
                    <TableCell align="right">
                    <IconButton
                      sx={{ color: '#715B68' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/students/${s.id}/edit`);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                        sx={{ color: '#715B68' }}
                        onClick={async (e) => {
                          e.stopPropagation();
                          await deleteStudent(s.id);
                          setClassInfo((prev) => ({
                            ...prev,
                            students: prev.students.filter((student) => student.id !== s.id),
                          }));
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                  </TableCell>
                    </TableRow>
                ))}
                </TableBody>

          </Table>
        </Paper>
      </Box>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination count={3} page={1} />
        </Box>
      </Box>
    </div>
  );
};

export default ClassDetail;
