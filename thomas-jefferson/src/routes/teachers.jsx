import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import List from '../components/list'
import { getAllTeachers, deleteTeacher, updateTeacher, } from "../utils/CRUDteachers"
import '../styles/students.css'
import { Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom';

const Teachers = () => {
    const [teachers, setTeachers] = useState([])
    const [filteredTeachers, setFilteredTeachers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const nav = useNavigate()

    const fetchTeachers = async () => {
        const data = await getAllTeachers();
        setTeachers(data);
        setFilteredTeachers(data);
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

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase()
        setSearchTerm(value);
        if (value.trim() === ''){
            setFilteredTeachers(teachers);
        }
        else{
            const filtered = teachers.filter(teacher =>
                teacher.first_name.toLowerCase().includes(value) ||
                teacher.last_name.toLowerCase().includes(value)
            )
            setFilteredTeachers(filtered);
        }
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
                items={filteredTeachers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            {filteredTeachers.length === 0 && searchTerm && (
                <div className="no-results">
                    <p>No teachers found matching "{searchTerm}"</p>
                </div>
            )}

            </div>
        </div>
    )
}

export default Teachers
