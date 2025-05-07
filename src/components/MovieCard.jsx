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
            <div className="content">
                <div className="rating">
                    <img src="star.svg" alt="Star Icon" />
                    <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                </div>

                <span>•</span>
                <p className="lang">{movie.original_language}</p>

                <span>•</span>
                <p className="year">
                    {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                </p>
            </div>
        </li>
    );
};

export default MovieCard;
