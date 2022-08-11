import React, { useEffect, useState } from 'react'
import axios from "../axios";
import requests from '../requests';
import './Banner.css';
const Banner = () => {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            const index = Math.floor(Math.random() * request.data.results.length - 1);
            // console.log(request.data.results);
            setMovie(request.data.results[index]);
            return request;
        }
        fetchData();
    }, []);
    console.log(movie);
    return (
        <header className='banner'
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}>
            <div className="banner--fadeBottom">
                <div className='banner__contents'>
                    <h1 className='banner__title'>
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    <div className="banner__buttons">
                        <button className="banner__button">Play</button>
                        <button className="banner__button">My List</button>
                    </div>
                    <h2 className="banner__description">{movie?.overview?.slice(0, 150)}{(movie?.overview?.length > 150) ? "..." : ""}</h2>
                </div>

            </div>
        </header>
    )
}

export default Banner