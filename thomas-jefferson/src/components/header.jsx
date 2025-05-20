import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <Link to='/'>Dashboard</Link>
            <Link to='/login'>Login</Link>
            <Link to='/students'>Students</Link>
            <Link to='/teachers'>Teachers</Link>
            <Link to='/calendar'>Calendar</Link>
        </div>
    )
}

export default Header