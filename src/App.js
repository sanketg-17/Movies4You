import React,{ useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext.js';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { useMovieContext } from './MovieContext.js';
import './App.css';
import axios from 'axios';

const App = () => {

    const {authenticateUser}=useAuth();
    const {movies,setMovies}=useMovieContext();
    let triggerFetchMovies=0;
    
    useEffect(()=>{
        authenticateUser();
        triggerFetchMovies^=1;
    },[]);

    
    const [loading,setLoading]=useState(1);

    const fetchMovies=async()=>{
        const response=await axios.get("https://movies4u-idc6.onrender.com/api/movies/");
        const data=await response.data;
        setMovies(data.data);
        localStorage.setItem('movies', data);// caching all movies data to client storage.
        setLoading(0);
    }

    useEffect(()=>{
        fetchMovies();
    },[triggerFetchMovies]);

    return (
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={loading?<h1>Loading...</h1>:<MovieList />} />
                    <Route path="/movie/:_id" element={<ProtectedRoute element={loading?<h1>Loading...</h1>:<MovieDetail movies={movies} />} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                </Routes>
            </div>
    );
};

export default App;
