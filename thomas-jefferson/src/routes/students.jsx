import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import List from '../components/list'
import { getAllStudents, deleteStudent, updateStudent, } from "../utils/CRUDstudents"
import '../styles/students.css'
import { Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom';

const Students = () => {
    const [students, setStudents] = useState([])
    const [filteredStudents, setFilteredStudents] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const nav = useNavigate()

    const fetchStudents = async () => {
        const data = await getAllStudents();
        setStudents(data);
        setFilteredStudents(data);
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

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase()
        setSearchTerm(value);
        if (value.trim() === ''){
            setFilteredStudents(students);
        }
        else{
            const filtered = students.filter(student =>
                student.first_name.toLowerCase().includes(value) ||
                student.last_name.toLowerCase().includes(value)
            )
            setFilteredStudents(filtered);
        }
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
            <div className="search-container">
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                        className: "search-input"
                    }}
                />
            </div>
            <List
                items={filteredStudents}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            {filteredStudents.length === 0 && searchTerm && (
                <div className="no-results">
                    <p>No students found matching "{searchTerm}"</p>
                </div>
            )}

            </div>
        </div>

    )
}

export default Students