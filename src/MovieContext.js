import React, { createContext, useState, useContext } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => {
    return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
    const [movies,setMovies]=useState(null);



    return (
        <MovieContext.Provider value={{ movies,setMovies}}>
            {children}
        </MovieContext.Provider>
    );
};
