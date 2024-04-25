import React, { useEffect, useState } from 'react';
import MovieCard from '../../components/movieCard/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from "../../store/moviesSlice";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./home.css";
import UpdateMovie from '../../components/updateMovie/UpdateMovie';
import { fetchActors } from '../../store/actorSlice';
import { fetchProducers } from '../../store/producerSlice';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector(state => state.movies.movies);
  const status = useSelector(state => state.movies.status);

  const [currentMovieToUpdate, setCurrentMovieToUpdate] = useState();
  const [showPopup, setShowPopup] = useState(false);

  const { actors } = useSelector((state) => state.actors);
  const { producers } = useSelector((state) => state.producers);

  const handleEditClick = (value) => {
    setCurrentMovieToUpdate(value)
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleUpdateMovie = (updatedMovieData) => {
    
    console.log('Updated movie data:', updatedMovieData);

    handleClosePopup();
  };
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!localStorage.getItem("imdb-user")) {
        navigate("/login");
      } else {
        dispatch(fetchMovies());
        dispatch(fetchActors());
        dispatch(fetchProducers())
      }
    }
    fetchUserDetails();
  }, [dispatch,navigate]);

  return (
    <>
      <div className='movies'>
        <h1>Movies</h1>
        <Link to="/addMovie">
          <button type="button" className="btn btn-primary button">Add Movie</button>
        </Link>
        {
          status === ("loading" || "initial") ?
            <div className="loading">...loading</div> :
            movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} handleEditClick={handleEditClick}></MovieCard>
            ))
        }
      </div>
      {showPopup && (
        <UpdateMovie
          movie={currentMovieToUpdate}
          onClose={handleClosePopup}
          onSubmit={handleUpdateMovie}
          actors={actors}
          producers={producers}
        />
      )}
    </>
  )
}

export default Home