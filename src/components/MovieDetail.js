import React from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';
import { useMovieContext } from '../MovieContext';

const MovieDetail = () => {

    const { _id } = useParams();
    const {movies}=useMovieContext();
    
    let movie;
    movie=movies.find(movie=>movie._id===_id);
    console.log(movie);
    const base64String = btoa(
        new Uint8Array(movie.image.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );


    if (!movie) {
        return <h2>Movie not found</h2>;
    }

    return (
        <div className="movie-detail">
            <img src={`data:image/jpeg;base64,${base64String}`} alt={movie.title} className="movie-detail-image" />
            <div className="movie-detail-content">
                <h1>{movie.title}</h1>
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
                <p><strong>Rating:</strong> {movie.rating}</p>
                <p>{movie.longDescription}</p>
            </div>
        </div>
    );
};

export default MovieDetail;
