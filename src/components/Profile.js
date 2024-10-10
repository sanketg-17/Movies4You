import React from 'react';
import { useAuth } from '../AuthContext';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();

    if (!user) {
        return <h2>User not found</h2>;
    }

    return (
        <div className="profile-container">
            <img src='https://via.placeholder.com/150' alt="Profile" className="profile-image" />
            <div className="profile-details">
                <h2>{user.username}</h2>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
        </div>
    );
};

export default Profile;
