import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
                if (!response.ok) throw new Error('Failed to fetch movie details');
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setErrorMessage('Error fetching movie details');
            }
        };

        fetchMovie();
    }, [id]);

    if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;
    if (!movie) return <p>Loading...</p>;

    return (
        <div className="movie-detail">
            <div className="image-wrapper relative">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={`${movie.title} backdrop`}
                    className="backdrop-image"
                />
                <img
                    src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    className="poster-image absolute left-4 top-1/2 -translate-y-1/2"
                />
            </div>
            <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>

            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong>  {movie.vote_average ? Math.round(movie.vote_average) : 'N/A'}</p>
            <p className="mt-2"><strong>Overview:</strong> {movie.overview}</p>
        </div>

    );
};

export default MovieDetail;
