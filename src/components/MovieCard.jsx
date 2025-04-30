import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    if (!movie) return null;

    return (
        <li className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <h3>{movie.title}</h3>
            </Link>
        </li>
    );
};

export default MovieCard;
