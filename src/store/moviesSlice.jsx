import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addMovieRoute, getAllMovies } from '../utils/APIRoutes';

const initialState = {
  movies: [],
  status: 'initial', 
  error: null,    
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  try {
    const response = await axios.get(getAllMovies);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw error;
  }
});

export const createMovie = createAsyncThunk('movies/createMovie', async (movieData) => {
  try {
    const response = await axios.post(addMovieRoute, movieData);
    return response.data;
  } catch (error) {
    console.error('Error creating movie:', error.message);
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
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies.push(action.payload);
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
