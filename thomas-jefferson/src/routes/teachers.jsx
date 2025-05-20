import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import List from '../components/list'
import { getAllTeachers, deleteTeacher, updateTeacher, } from "../utils/CRUDteachers"
import '../styles/students.css'

const Teachers = () => {
    const [teachers, setTeachers] = useState([])

    const fetchTeachers = async() => {
        const data = await getAllTeachers();
        setTeachers(data);
        //firebase logic
    }
    const handleEdit = async(id) => {
        await deleteTeacher(id);
        fetchTeachers();
        //firebase logic
    }
    const handleDelete = (teacher) => {
        console.log("editing", teacher)
        //firebase logic
    }

    useEffect(() => {
        fetchTeachers()
    }, []);
    return (

        <div className="students-container">
            <Header/>
            <div className="students-content">
            <h1 className="students-name">Teacher Directory</h1>
            <List
                items={teachers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            </div>

        </div>
    )
}

export default Teachers