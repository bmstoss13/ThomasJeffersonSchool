import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import List from '../components/list'
import { getAllStudents, deleteStudent, updateStudent, } from "../utils/CRUDstudents"
import '../styles/students.css'

const Students = () => {
    const [students, setStudents] = useState([])

    const fetchStudents = async () => {
        const data = await getAllStudents();
        setStudents(data);
        //firebase logic
    }
    const handleEdit = async (id) => {
        await deleteStudent(id);
        fetchStudents();
        //firebase logic
    }
    const handleDelete = (student) => {
        console.log("editing", student)
        //firebase logic
    }

    useEffect(() => {
        fetchStudents()
    }, []);
    return (

        <div className="students-container">
            <Header/>
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