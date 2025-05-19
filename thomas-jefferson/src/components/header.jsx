import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <Link to='/'>Dashboard</Link>
            <Link to='/login'>Login</Link>
            <Link to='/students'>Student Directory</Link>
        </div>
    )
}

export default Header