import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const authenticateUser=async()=>{
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response=await axios.get('https://movies4u-idc6.onrender.com/api/auth/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                if(response.status===400){
                    localStorage.removeItem('token');
                    navigate("/login");
                }
    
                console.log(response.data.user);
                setUser(response.data.user);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const login = async (email, password) => {
        try {
            const response = await axios.post('https://movies4u-idc6.onrender.com/api/auth/login', { email, password });
            if(response.status!==200){
                throw response.json
            }
            localStorage.setItem('token', response.data.token);
            authenticateUser();
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const register = async (username, email, password) => {
        try {
            const response=await axios.post('https://movies4u-idc6.onrender.com/api/auth/register', { username, email, password });
            if(response.status!==202){
                throw response.json
            }
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout ,authenticateUser}}>
            {children}
        </AuthContext.Provider>
    );
};
