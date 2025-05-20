import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import List from '../components/list'
import { getAllTeachers, deleteTeacher, updateTeacher, } from "../utils/CRUDteachers"

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
        <div>
            <Header/>
            <h1>Teacher Directory</h1>
            <List
                items={teachers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    )
}

export default Teachers