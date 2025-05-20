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

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'classes'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClasses(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
    <Box sx={{ p: 4,  pt: 8, backgroundColor: '#EFD9CE', minHeight: '100vh', textAlign: 'left', }}>

    <Box sx={{ textAlign: 'left', mb: 4 }}>  
      <Typography variant="h4" fontWeight="bold" color="black" mb={2} mt={2}>Class Dashboard</Typography>
      <Typography variant="subtitle1" color="black" gutterBottom>Overview of all classes, teachers, and student counts</Typography>
    </Box>
      {/* Summary Boxes */}
      <Grid container spacing={2} sx={{ my: 2 }}>
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

      {/* Create Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          Create
        </Button>
      </Box>

      {/* Class Table */}
      <Paper>
      <Box sx={{ mt: 4, overflowX: 'auto' }}>
        <Table sx={{ width: '100%' }} aria-label="class table">
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
    </Box>
    </Paper>

      {/* Pagination Placeholder */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Pagination count={3} page={1} />
      </Box>
    </Box>
    </div>
  );
};

export default ClassDashboard;
