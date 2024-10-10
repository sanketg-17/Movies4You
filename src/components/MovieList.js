import React from 'react';
import MovieCard from './MovieCard';
import { useMovieContext } from '../MovieContext';

const MovieList = () => {
    const {movies}=useMovieContext();
    return (
        <>
        <div className="movie-list">
            {movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} />
            ))}
        </div>
        </>
    );
};

export default MovieList;
