import React from 'react';
import Header from '../components/header';
import { Button } from '@mui/material';
import '../styles/dashboard.css';
import schoolImage from '../assets/img1.jpg';

const Dashboard = () => {
    return (
        <div>
            <Header />

            <div className="dashboardWrapper">
                <h1>Welcome, Admin!</h1>
                <div className="imageContainer">
                    <img src={schoolImage} alt="School" className="myImage" />
                </div>

                <div className="contentContainer">

                    <div className="adminButtonsContainer">
                        <Button className="adminButton" variant="contained" color="primary">
                            Student Directory
                        </Button>
                        <Button className="adminButton" variant="contained" color="primary">
                            Teacher Directory
                        </Button>
                        <Button className="adminButton" variant="contained" color="primary">
                            Classes Dashboard
                        </Button>
                        <Button className="adminButton" variant="contained" color="primary">
                            School Calendar
                        </Button>
                        <Button className="adminButton" variant="contained" color="primary">
                            Add New Student
                        </Button>
                        <Button className="adminButton" variant="contained" color="primary">
                            Add New Teacher
                        </Button>
                        <Button className="adminButton" variant="contained" color="primary">
                            Admin Tools
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
