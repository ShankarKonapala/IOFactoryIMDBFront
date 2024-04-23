import React, { useEffect } from 'react';
import MovieCard from '../../components/movieCard/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from "../../store/moviesSlice";
import { Link } from 'react-router-dom';

import "./home.css"

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.movies);
  const status = useSelector(state => state.movies.status);

  useEffect(() => {
    if (status === "initial") {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  console.log(status);

  // const [query, setQuery] = useState('');
  // const handleSearch = (event) => {
  //   setQuery(event.target.value);
  // };

  // const filteredMovies = (query === '')
  //   ? movies
  //   : movies.filter(movie =>
  //     movie.title.toLowerCase().includes(query.toLowerCase())
  //   );
  // const sortedMovies = [...filteredMovies];
  // sortedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
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
              <MovieCard key={movie.id} movie={movie}></MovieCard>
            ))
        }
      </div>
    </>
  )
}

export default Home