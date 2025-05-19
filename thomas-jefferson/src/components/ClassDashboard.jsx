import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Table, TableHead, TableBody, TableCell, TableRow, IconButton, Pagination, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const mockClasses = [
    { teacher: 'Ms. Johnson', grade: 1, students: 24, room: 101 },
    { teacher: 'Mr. Apple', grade: 2, students: 18, room: 221 },
    { teacher: 'Mrs. Smith', grade: 3, students: 22, room: 113 },
    { teacher: 'Ms. Lee', grade: 4, students: 28, room: 200 },
    { teacher: 'Mrs. Jackson', grade: 5, students: 16, room: 50 },
  ];

  export default function ClassDashboard() {
    return (
      <Box sx={{ p: 4, backgroundColor: '#EFD9CE', minHeight: '100vh' }}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Class Dashboard
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Overview of all classes, teachers, and student counts
        </Typography>
        </Box>
    );
}