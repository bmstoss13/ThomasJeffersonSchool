import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import List from '../components/list'

const Students = () => {
    const [students, setStudents] = useState([])
    const fetchStudents = () => {
        setStudents();
        //firebase logic
    }
    const handleEdit = () => {
        //firebase logic
    }
    const handleDelete = () => {
        //firebase logic
    }
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