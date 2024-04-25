import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateMovie } from '../../store/moviesSlice';
import "./updateMovie.css";
import { fetchActors } from '../../store/actorSlice';
import { fetchProducers } from '../../store/producerSlice';


export default function UpdateMovie({ movie, onClose, onSubmit, actors, producers }) {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchActors);
    dispatch(fetchProducers)
  },[dispatch])

  const [currentMovieDetails, setCurrentMovieDetails] = useState({
    _id: movie._id,
    movieName: movie.movieName,
    movieActors: movie.movieActors,
    producer: movie.producer.producerName,
    releaseYear: movie.releaseYear,
    plot: movie.plot
  })

  const handleSelectedActor = (e) => {
    const actorId = e.target.value;
    const selectedActor = actors.find((actor) => actor._id === actorId);
    if (selectedActor && !currentMovieDetails.movieActors.some((actor) => actor._id === actorId)) {
      setCurrentMovieDetails((prevDetails) => ({
        ...prevDetails,
        movieActors: [...prevDetails.movieActors, selectedActor]
      }));
    }
  };

  const availableActors = actors.filter((actor) => !currentMovieDetails.movieActors.some((selectedActor) => selectedActor._id === actor._id));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(updateMovie(currentMovieDetails))
        .then(() => {
          toast.success('Movie updated successfully');
          resetForm();
          onClose();
        })
        .catch((error) => {
          toast.error('Failed to update movie');
          console.error('Error adding movie:', error);
        });
    }
  };
  const handleValidation = () => {
    const { movieName, producer } = currentMovieDetails;
    if (movieName === '') {
      toast.error('Movie Name is required');
      return false;
    } else if (producer === '') {
      toast.error('Producer name is required');
      return false;
    }
    return true;
  };
  const resetForm = () => {
    setCurrentMovieDetails({
      movieName: '',
      movieActors: [],
      producer: '',
      releaseYear: '',
      plot: ''
    });
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>x</button>
        <form className='form' onSubmit={handleSubmit}>
          <h2>Edit Movie</h2>
          <input
            type="text"
            value={currentMovieDetails.movieName}
            onChange={(e) => setCurrentMovieDetails({ ...currentMovieDetails, movieName: e.target.value })}
            placeholder="Enter Movie name"
            required
          />
          <input
            type="number"
            value={currentMovieDetails.releaseYear}
            onChange={(e) => setCurrentMovieDetails({ ...currentMovieDetails, releaseYear: e.target.value })}
            placeholder="Enter release year"
            required
          />
          <input
            type="text"
            value={currentMovieDetails.plot}
            onChange={(e) => setCurrentMovieDetails({ ...currentMovieDetails, plot: e.target.value })}
            placeholder="Enter Plot"
            required
          />
          <select onChange={handleSelectedActor} className='select-options'>
            <option>Select Actors</option>
            {availableActors.map((actor) => (
              <option key={actor._id} value={actor._id}>
                {actor.actorName}
              </option>
            ))}
          </select>
          <div>
            <span className='span'>Selected Actors:</span>
            <p>{currentMovieDetails.movieActors.map((actor) => (
                <small key={actor._id}>{actor.actorName}, </small>
            ))}
            </p>
          </div>
          <select onChange={(e) => setCurrentMovieDetails({ ...currentMovieDetails, producer: e.target.value })} className='select-options' required>
            <option value="">Select a Producer</option>
            {producers.map((producer) => (
              <option key={producer._id} value={producer._id}>
                {producer.producerName}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </form>
        <ToastContainer position="bottom-right" autoClose={8000} pauseOnHover draggable />
      </div>
    </div>
  )
}
