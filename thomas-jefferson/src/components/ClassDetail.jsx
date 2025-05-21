import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Table, TableHead, TableBody, TableCell, TableRow, IconButton, Button, Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Header from '../components/Header';
import { getClassById } from '../utils/CRUDclasses'; 

const ClassDetail = () => {
  const { id } = useParams();
  const [classInfo, setClassInfo] = useState(null);

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
      <Box sx={{ px: 2, pt: 10, pb: 5, backgroundColor: '#EFD9CE', minHeight: '100vh' }}>
        <Typography variant="h5" fontWeight="bold" color="black">{classInfo.teacher}’s Class</Typography>
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
              <Typography variant="h5">F+</Typography> 
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Grade</Typography>
              <Typography variant="h5">{classInfo.grade}st</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#095256' }} startIcon={<AddIcon />}>Add</Button>
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
                        <IconButton><EditIcon /></IconButton>
                        <IconButton><DeleteIcon /></IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>

          </Table>
        </Paper>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination count={3} page={1} />
        </Box>
      </Box>
    </div>
  );
};

export default ClassDetail;
