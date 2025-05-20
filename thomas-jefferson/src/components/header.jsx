import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import logo from '../assets/jlogo.webp';

const Header = () => {
    return (
        <div className="header-container">
            <div className="logo-container">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
            </div>

            <nav className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/login">Login</Link>
                <Link to="/students">Students</Link>
                <Link to="/teachers">Teachers</Link>
                <Link to="/classes">Classes</Link>
                <Link to="/calendar">Calendar</Link>
                <Link to="/logout">Logout</Link>
            </nav>
        </div>
    );
};

export default Header;
