import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addActorRoute, getAllActorsRoute } from "../utils/APIRoutes"

const initialState = {
  actors: [],
  status: 'initial',
  error: null,
};

export const fetchActors = createAsyncThunk('actors/fetchActors', async () => {
  try {
    const response = await axios.get(getAllActorsRoute);
    return response.data;
  } catch (error) {
    console.error('Error fetching actors:', error.message);
    throw error;
  }
});

export const addActorAsync = createAsyncThunk('actors/addActor', async (actorData, { rejectWithValue }) => {
  try {
    const response = await axios.post(addActorRoute, actorData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const actorsSlice = createSlice({
  name: 'actors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchActors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.actors = action.payload;
      })
      .addCase(fetchActors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addActorAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addActorAsync.fulfilled, (state, action) => {
        const {actorName, _id} = action.payload
        state.actors.push({actorName, _id});
      })
      .addCase(addActorAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Failed to add actor';
      });
  },
});

export default actorsSlice.reducer;
