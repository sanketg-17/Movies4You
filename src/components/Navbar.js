import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (    
        <nav className="navbar">
            <h1 className="navbar-logo">Movies4U.com</h1>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                {!user ?( <li><Link to="/login">Login/Register</Link></li>) :(
                    <li className="profile">
                        {/* <img 
                            src="https://via.placeholder.com/30" 
                            alt="Profile" 
                            className="profile-image"
                            onClick={toggleDropdown}
                        /> */}
                        <span onClick={toggleDropdown}>Hello {user.username}</span>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/profile" className="dropdown-item">View Profile</Link>
                                <div className="dropdown-item" onClick={logout}>Logout</div>
                            </div>
                        )}
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
