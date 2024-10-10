import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const base64String = btoa(
        new Uint8Array(movie.image.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    const shortDescription = `${movie.longDescription.substring(0, 100)}...`;

    return (
        <div className="movie-card">
            <img src={`data:image/jpeg;base64,${base64String}`} alt={movie.title} />
            <div>
                <h3>{movie.title}</h3>
                <p>{shortDescription}</p>
                <Link to={`/movie/${movie._id}`}>View Details</Link>
            </div>
        </div>
    );
};

export default MovieCard;
