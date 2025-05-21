import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import List from '../components/list'
import { getAllTeachers, deleteTeacher, updateTeacher, } from "../utils/CRUDteachers"
import '../styles/students.css'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Teachers = () => {
    const [teachers, setTeachers] = useState([])
    const nav = useNavigate()

    const fetchTeachers = async () => {
        const data = await getAllTeachers();
        setTeachers(data);
        //firebase logic
    }
    const handleDelete = async (id) => {
        await deleteTeacher(id);
        fetchTeachers();
        //firebase logic
    }
    const handleEdit = (teacher) => {
        console.log("editing", teacher)
        //firebase logic
    }

    useEffect(() => {
        fetchTeachers()
    }, []);
    return (

        <div className="students-content">
            <Header />
            <h1 className="students-name">Teacher Directory</h1>
            <div className="students-content-inner">
                <div className="adminButtonsContainer-s">
                    <Button
                        className="adminButton-s"
                        variant="contained"
                        color="success"
                        onClick={() => nav('/teachers/new')}
                    >
                        +
                    </Button>
                </div>

                <div className="students-content">
                    <List
                        items={teachers}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default Teachers
