import React from 'react';
import movieIMG from "../../assets/movie.avif";

import "./moviecard.css"

const MovieCard = ({ movie, key }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="movie-content">
          <img src={movieIMG} className="img-fluid rounded-start movieImg" alt="Movie" />
          <div className="movie-info">
            <h5 className="card-title">{movie.movieName}</h5>
            <p className="card-text">{movie.plot}</p>
            <p className="card-text"><small className="text-muted">{movie.actors}</small></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard