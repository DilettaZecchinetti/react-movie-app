import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
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
            <button
                onClick={() => navigate('/')}
                className="mb-6 inline-block bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition"
            >
                ← Back to Home
            </button>

            <div className="image-wrapper">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={`${movie.title || 'Movie'} backdrop`}
                    className="backdrop-image"
                    loading="lazy"
                />
                <div className="overlay" />
                <img
                    src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                    alt={`${movie.title || 'Movie'} poster`}
                    className="poster-image"
                    loading="lazy"
                />
            </div>

            <h1>{movie.title}</h1>

            <p><strong>Release Date:</strong> {movie.release_date || 'N/A'}</p>
            <p className="flex items-center justify-center gap-1">
                <strong>Rating:</strong>
                <span className="flex items-center gap-1 ml-1">
                    <img src="/star.svg" alt="Star Icon" className="w-5 h-5 inline-block" />
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </span>
            </p>

            <p className="mt-2"><strong>Overview:</strong> {movie.overview || 'No overview available.'}</p>
        </div>
    );
};

export default MovieDetail;
