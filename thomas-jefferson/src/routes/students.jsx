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

        <div className="students-content">
            <Header />
            <h1 className="students-name">Student Directory</h1>
            <div className="students-content-inner">
                <div className="adminButtonsContainer-s">
                    <Button
                        className="adminButton-s"
                        variant="contained"
                        color="success"
                        onClick={() => nav('/students/new')}
                    >
                        +
                    </Button>
                </div>
                <div className="students-content">
                    <List
                        items={students}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>

    )
}

export default Students