import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import List from '../components/list'
import { getAllStudents, deleteStudent, updateStudent, } from "../utils/CRUDstudents"

const Students = () => {
    const [students, setStudents] = useState([])

    const fetchStudents = async() => {
        const data = await getAllStudents();
        setStudents(data);
        //firebase logic
    }
    const handleEdit = async(id) => {
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
        <div>
            <Header/>
            <h1>Student Directory</h1>
            <List
                items={students}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    )
}

export default Students