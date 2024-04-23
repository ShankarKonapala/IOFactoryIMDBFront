import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AddActor from '../../components/addActor/AddActor';
import AddProducer from '../../components/addProducer/AddProducer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActors } from '../../store/actorSlice';
import { fetchProducers } from '../../store/producerSlice';
import { createMovie } from '../../store/moviesSlice';
import './addMovie.css'; // Import the external CSS file

export default function AddMovie() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { actors } = useSelector((state) => state.actors);
    const { producers } = useSelector((state) => state.producers);

    const [movieName, setMovieName] = useState('');
    const [movieActors, setMovieActors] = useState([]);
    const [producer, setProducer] = useState({});
    const [releaseYear, setReleaseYear] = useState('');
    const [plot, setPlot] = useState('');
    const [actorDisplay, setActorDisplay] = useState(false)
    const [producerdisplay, setProducerDisplay] = useState(false)

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    };

    useEffect(() => {
        dispatch(fetchActors());
        dispatch(fetchProducers());
    }, [dispatch]);

    const handleSelectedActor = (e) => {
        const actorId = e.target.value;
        const selectedActor = actors.find((actor) => actor._id === actorId);
        if (selectedActor && !movieActors.some((selectedActor) => selectedActor._id === actorId)) {
            console.log(movieActors);
            setMovieActors([...movieActors, selectedActor]);
        }
    };

    const availableActors = actors.filter((actor) => !movieActors.some((selectedActor) => selectedActor._id === actor._id));

    const handleProducerChange = (e) => {
        setProducer(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const movieDetails = { movieName, movieActors, producer, releaseYear, plot };
        if (handleValidation()) {
            try {
                dispatch(createMovie(movieDetails));
                toast.success('Movie added successfully');
            } catch (error) {
                toast.error('Failed to add movie');
            }
            setMovieName('');
            setReleaseYear('');
            setPlot('');
            setMovieActors([]);
            setProducer({});
        }
        navigate("/")
    };

    const handleActorDisplay = (e) =>{
        setActorDisplay(!actorDisplay)
    }
    const handleProducerDisplay = (e) =>{
        setProducerDisplay(!producerdisplay)
    }

    const handleValidation = () => {
        if (movieName === '') {
            toast.error('Movie Name is required', toastOptions);
            return false;
        } else if (producer === '') {
            toast.error('Producer name is required', toastOptions);
            return false;
        }
        return true;
    };

    return (
        <div className='add-movie-page'>
            <div className="add-movie-form">
                <form className='form' onSubmit={handleSubmit}>
                <h2>Add Movie</h2>
                    <input
                        type="text"
                        value={movieName}
                        name="movieName"
                        placeholder="Enter Movie name"
                        onChange={(e) => setMovieName(e.target.value)}
                    />
                    <input
                        type="number"
                        value={releaseYear}
                        className=""
                        onChange={(e) => setReleaseYear(e.target.value)}
                        placeholder="Enter release year"
                    />
                    <input
                        type="text"
                        value={plot}
                        className=""
                        onChange={(e) => setPlot(e.target.value)}
                        placeholder="Enter Plot"
                    />
                    <select onChange={handleSelectedActor}>
                        <option>Select Actors</option>
                        {availableActors.map((actor) => (
                            <option key={actor._id} value={actor._id}>
                                {actor.actorName}
                            </option>
                        ))}
                    </select>
                    <span className='span'>Selected Actors:</span>
                    {movieActors.map((actor) => (
                        <div key={actor._id}>{actor.actorName}</div>
                    ))}
                    <select onChange={handleProducerChange}>
                        <option>Select a Producer</option>
                        {producers.map((producer) => (
                            <option key={producer._id} value={producer._id}>
                                {producer.producerName}
                            </option>
                        ))}
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div> 
            <button onClick={handleActorDisplay}>Add new Actor</button>
            <button onClick={handleProducerDisplay}>Add new Producer</button>
            <ToastContainer />
            {actorDisplay && <AddActor />}
            {producerdisplay && <AddProducer/>   }
        </div>
    );
}

