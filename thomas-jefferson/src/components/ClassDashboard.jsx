import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Table, TableHead, TableBody, TableCell, TableRow, IconButton, Pagination, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Header from './Header';

const ClassDashboard = () => {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    const data = await getAllClasses();
    setClasses(data);
  };

  const handleDelete = async (id) => {
    await deleteClass(id);
    fetchClasses();
  };

  const handleEdit = (cls) => {
    console.log('Editing class:', cls);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div>
      <Header />
      <Box sx={{ p: 4, pt: 10, backgroundColor: '#EFD9CE', minHeight: '100vh' }}>
  {/* Header Row */}
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      mb: 4,
    }}
  >
       <Box>
      <Typography variant="h4" fontWeight="bold" color="black" mb={2} mt={2}>Class Dashboard</Typography>
      <Typography variant="subtitle1" color="black" gutterBottom>Overview of all classes, teachers, and student counts</Typography>
    </Box>

          <Button
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
                {classes.reduce((acc, curr) => acc + (curr.students || 0), 0)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>


        {/* Class Table */}
        <Box sx={{ mt: 4, width: '100%' }}>
          <Paper sx={{ width: '100%', overflowX: 'auto', mt: 2 }}>
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
            {classes.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.teacher}</TableCell>
                <TableCell>{c.grade}</TableCell>
                <TableCell>{c.students}</TableCell>
                <TableCell>{c.room}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary"><EditIcon /></IconButton>
                  <IconButton color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Paper> 
    </Box>
    

        {/* Pagination Placeholder */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination count={3} page={1} />
        </Box>
      </Box>
    </div>
  );
};

export default ClassDashboard;
