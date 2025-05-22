import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Table, TableHead, TableBody, TableCell, TableRow, IconButton, Button, Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Header from '../components/header';
import { getClassById } from '../utils/CRUDclasses'; 
import { useNavigate } from 'react-router-dom';
import { deleteStudent, updateStudent } from '../utils/CRUDstudents';



const ClassDetail = () => {
  const { id } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClass = async () => {
      const data = await getClassById(id);
      setClassInfo(data);
    };
    fetchClass();
  }, [id]);

  
  if (!classInfo) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Box sx={{ mt: 4, px: 2, pt: 14, pb: 5, backgroundColor: '#EFD9CE', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', overflowX: 'hidden' }}>
        <Typography variant="h3" fontWeight="bold" color="#095256">{classInfo.teacher}’s Class</Typography>
        <Typography variant="subtitle1" color="black" gutterBottom>Overview of {classInfo.teacher}’s Class</Typography>

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
              <Typography variant="h5">95</Typography> 
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
                    <TableCell>{s.grade_level}</TableCell>
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
