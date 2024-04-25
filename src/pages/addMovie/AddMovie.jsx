import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AddActor from '../../components/addActor/AddActor';
import AddProducer from '../../components/addProducer/AddProducer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActors } from '../../store/actorSlice';
import { fetchProducers } from '../../store/producerSlice';
import { createMovie } from '../../store/moviesSlice';
import 'react-toastify/dist/ReactToastify.css';

export default function AddMovie() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { actors } = useSelector((state) => state.actors);
    const { producers } = useSelector((state) => state.producers);

    const [showAddActorPopup, setShowAddActorPopup] = useState(false);
    const [showAddProducerPopup, setShowAddProducerPopup] = useState(false);

    const [movieDetails, setMovieDetails] = useState({
        movieName: '',
        movieActors: [],
        producerId: '',
        releaseYear: '',
        plot: ''
    });
    console.log(producers);

    useEffect(() => {
        if (!localStorage.getItem("imdb-user")) {
            navigate("/login");
        } else {
            dispatch(fetchActors());
            dispatch(fetchProducers());
        }
    }, [dispatch, navigate]);

    const handleActorDisplay = () => {
        setShowAddActorPopup(true);
    };

    const handleProducerDisplay = () => {
        setShowAddProducerPopup(true);
    };

    const handleCloseModal = () => {
        setShowAddActorPopup(false);
        setShowAddProducerPopup(false);
    };

    const handleSelectedActor = (e) => {
        const actorId = e.target.value;
        const selectedActor = actors.find((actor) => actor._id === actorId);
        if (selectedActor && !movieDetails.movieActors.some((actor) => actor._id === actorId)) {
            setMovieDetails((prevDetails) => ({
                ...prevDetails,
                movieActors: [...prevDetails.movieActors, selectedActor]
            }));
        }
    };

    const availableActors = actors.filter((actor) => !movieDetails.movieActors.some((selectedActor) => selectedActor._id === actor._id));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            dispatch(createMovie(movieDetails))
                .then(() => {
                    toast.success('Movie added successfully');
                    resetForm();
                    navigate("/")
                })
                .catch((error) => {
                    toast.error('Failed to add movie');
                    console.error('Error adding movie:', error);
                });
        }
    };

    const handleValidation = () => {
        const { movieName, producer } = movieDetails;
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
        setMovieDetails({
            movieName: '',
            movieActors: [],
            producer: '',
            releaseYear: '',
            plot: ''
        });
    };

    return (
        <>
        <div className='form-container'>
        <form className='form' onSubmit={handleSubmit}>
                <h2>Add Movie</h2>
                <input
                    type="text"
                    value={movieDetails.movieName}
                    onChange={(e) => setMovieDetails({ ...movieDetails, movieName: e.target.value })}
                    placeholder="Enter Movie name"
                    required
                />
                <input
                    type="number"
                    value={movieDetails.releaseYear}
                    onChange={(e) => setMovieDetails({ ...movieDetails, releaseYear: e.target.value })}
                    placeholder="Enter release year"
                    required
                />
                <input
                    type="text"
                    value={movieDetails.plot}
                    onChange={(e) => setMovieDetails({ ...movieDetails, plot: e.target.value })}
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
                    {movieDetails.movieActors.map((actor) => (
                        <p key={actor._id}>
                            <small>{actor.actorName}</small>
                        </p>
                    ))}
                </div>
                <select onChange={(e) => setMovieDetails({ ...movieDetails, producer: e.target.value })} className='select-options' required>
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
            <button className='add-actor-btn' onClick={handleActorDisplay}>Add new Actor</button>
            <button className='add-producer-btn' onClick={handleProducerDisplay}>Add new Producer</button>
            {showAddActorPopup && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <AddActor onClose={handleCloseModal} />
                    </div>
                </div>
            )}
            {showAddProducerPopup && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <AddProducer onClose={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>
            
        </>
    );
}
