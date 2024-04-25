import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addMovieRoute, getAllMovies, updateMovieRoute } from '../utils/APIRoutes';

const initialState = {
  movies: [],
  fetchMovieStatus: 'initial', 
  createMovieStatus: 'initial',
  error: null,    
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  try {
    const response = await axios.get(getAllMovies);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw error;
  }
});

export const createMovie = createAsyncThunk('movies/createMovie', async (movieData, { rejectWithValue }) => {
  try {
    const response = await axios.post(addMovieRoute, movieData);
    return response.data;
  } catch (error) {
    console.error('Error creating movie:', error.message);
    return rejectWithValue(error.response.data);
  }
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async (movieData) => {
  try {
    const {_id} = movieData;
    console.log(_id);
    const response = await axios.put(`${updateMovieRoute}/${_id}`, movieData);
    return response.data;
  } catch (error) {
    console.error('Error updating movie:', error.message);
    throw error;
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.fetchMovieStatus = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.fetchMovieStatus = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.fetchMovieStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(createMovie.pending, (state) => {
        state.createMovieStatus = 'loading';
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.createMovieStatus = 'succeeded';
        state.movies.push(action.payload);
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.createMovieStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
