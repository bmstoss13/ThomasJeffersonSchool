import React from 'react';
import Header from '../components/header';
import { Button } from '@mui/material';
import '../styles/dashboard.css';
import schoolImage from '../assets/img1.jpg';
import { useNavigate } from 'react-router-dom';

//added naviagte for various buttons on homescreen to go to different places
// header (nav bar) is for moving between places when youre in a specific directory
const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Header />

            <div className="imageContainer">
                <img src={schoolImage} alt="School" className="myImage" />
            </div>

            <div className="dashboardWrapper">
                <h1>Welcome, Admin!</h1>
                <div className="contentContainer">
                    {/* <h1>Welcome, Admin!</h1> */}
                    <div className="adminButtonsContainer">
                        <Button className="adminButton" variant="contained" onClick={() => navigate('/students')}>
                            Student Directory
                        </Button>
                        <Button className="adminButton" variant="contained" onClick={() => navigate('/teachers')}>
                            Teacher Directory
                        </Button>
                        <Button className="adminButton" variant="contained" onClick={() => navigate('/classes')}>
                            Classes Dashboard
                        </Button>
                        <Button className="adminButton" variant="contained" onClick={() => navigate('/calendar')}>
                            School Calendar
                        </Button>
                        <Button className="adminButton" variant="contained" color="success" onClick={() => navigate('/students/new')}>
                            Add New Student
                        </Button>
                        <Button className="adminButton" variant="contained" color="success" onClick={() => navigate('/teachers/new')}>
                            Add New Teacher
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
