import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Table, TableHead, TableBody, TableCell, TableRow, IconButton, Pagination, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Header from './header';
import { getAllClasses, deleteClass, getNoStudents } from '../utils/CRUDclasses';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAllTeachers } from '../utils/CRUDteachers';



const ClassDashboard = () => {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    const data = await getAllClasses();
    const classesWithStudentCounts = await Promise.all(
    data.map(async (classItem) => ({
      ...classItem,
      studentCount: await handleStudentNum(classItem.id)
    }))
  );
    setClasses(classesWithStudentCounts);
  };

  const handleDelete = async (id) => {
    await deleteClass(id);
    fetchClasses();
  };

  const handleStudentNum = async(id) =>{
    const number = await getNoStudents(id);
    return number;
  }

  const handleEdit = (cls) => {
    console.log('Editing class:', cls);
  };

  const navigate = useNavigate();


  const [teachers, setTeachers] = useState([]);

const fetchTeachers = async () => {
  const data = await getAllTeachers();
  setTeachers(data);
};

const extractTeacherId = (teacherPath) => {
  if (!teacherPath) return null;
  return teacherPath.split('/').pop();
};

useEffect(() => {
  fetchClasses();
  fetchTeachers();
}, []);

const teacherMap = {};
teachers.forEach((t) => {
  teacherMap[t.id] = `${t.first_name} ${t.last_name}`;
});

  return (
    <div>
      <Header />
      <Box sx={{ px: 2, pt: 14, pb: 4, backgroundColor: '#EFD9CE', minHeight: '100vh' }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto', textAlign: 'center', overflowX: 'hidden' }}>
        {/* Header Row */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            mb: 2,
          }}
        >
            <Box sx={{ width: '100%', textAlign: 'center', mt: 2, mb: 4 }}>
            <Typography variant="h3" fontFamily = 'Segoe UI' fontWeight="bold" color="#095256" mb={2} mt={2}>Class Dashboard</Typography>
            <Typography variant="subtitle1" color="black" gutterBottom>Overview of all classes, teachers, and student counts</Typography>
            <Typography variant="subtitle2" color="black" gutterBottom>Click on each class for detailed overview</Typography>
          </Box>

          <Button
            component={Link}
            to="/classes/new"
            variant="contained"
            sx={{ backgroundColor: '#715B68', color: 'white' }}
            startIcon={<AddIcon />}
          >
            Create
          </Button>
        </Box>
            
            {/* Summary Boxes */}
            <Grid container spacing={2} sx={{ my: 4, width: '100%' }}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Total Classes</Typography>
                  <Typography variant="h5">{classes.length}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Total Teachers</Typography>
                  <Typography variant="h5">{new Set(classes.map(c => c.teacher)).size}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Total Students</Typography>
                  <Typography variant="h5">
                    {classes.reduce((acc, curr) => acc + (curr.studentCount || 0), 0)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>


            {/* Class Table */}
            <Box sx={{ mt: 4, width: '100%' }}>
            <Paper sx={{ width: '100%', overflowX: 'auto'}}>
                  <Table sx={{ minWidth: 650 }} aria-label="class table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Teacher</b></TableCell>
                    
                    <TableCell><b>Grade</b></TableCell>
                    <TableCell><b>Students</b></TableCell>
                    <TableCell><b>Room #</b></TableCell>
                    <TableCell align="right"><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {classes.map((c) => {
                    const teacherId = extractTeacherId(c.teacher);
                    return (
                    <TableRow 
                      key={c.id}
                      onClick={() => navigate(`/class/${c.id}`)}
                      hover
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>{teacherMap[teacherId] || 'Unknown Teacher'}</TableCell>
                      <TableCell>{c.grade}</TableCell>
                      <TableCell>{c.studentCount}</TableCell>
                      <TableCell>{c.room}</TableCell>
                      <TableCell align="right">
                      <IconButton
                        sx={{  color: '#715B68' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/class/${c.id}/edit`);
                        }}
                      >
                        <EditIcon />
                        </IconButton>
                        <IconButton sx={{ color: '#715B68'}} onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              </Paper> 
          </Box>
        </Box> {/* closes maxWidth wrapper */}
    </Box> {/* closes background wrapper */}
    
      {/* Pagination Placeholder */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Pagination count={3} page={1} />
      </Box>
    </div>
  );
};

export default ClassDashboard;