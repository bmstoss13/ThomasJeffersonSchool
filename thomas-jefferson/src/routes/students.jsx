import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import List from '../components/list'
import { getAllStudents, deleteStudent, updateStudent, } from "../utils/CRUDstudents"
import '../styles/students.css'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Students = () => {
    const [students, setStudents] = useState([])
    const nav = useNavigate()

    const fetchStudents = async () => {
        const data = await getAllStudents();
        setStudents(data);
        //firebase logic
    }
    const handleDelete = async (id) => {
        await deleteStudent(id);
        fetchStudents();
        //firebase logic
    }
    const handleEdit = (student) => {
        console.log("editing", student)
        //firebase logic
    }

    useEffect(() => {
        fetchStudents()
    }, []);
    return (

        <div className="students-container">
            <Header/>
            <Button className="adminButton" variant="contained" color="success" onClick={() => nav('/students/new')}>+ Add New Student</Button>
            <div className="students-content">
            <h1 className="students-name">Student Directory</h1>
            <List
                items={students}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            </div>
        </div>
    )
}

export default Students