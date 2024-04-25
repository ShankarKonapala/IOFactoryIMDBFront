import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addProducerRoute, getAllProducersRoute } from "../utils/APIRoutes"

const initialState = {
  producers: [],
  status: 'initial',
  error: null,
};

export const fetchProducers = createAsyncThunk('producers/fetchProducers', async () => {
  try {
    const response = await axios.get(getAllProducersRoute);
    return response.data;
  } catch (error) {
    console.error('Error fetching producers:', error.message);
    throw error;
  }
});

export const addProducerAsync = createAsyncThunk('producers/addProducerAsync', async (producerData, { rejectWithValue }) => {
  try {
    const response = await axios.post(addProducerRoute, producerData);
    return response.data;
  } catch (error) {
    rejectWithValue(error.response.data);
    
  }
});

const producersSlice = createSlice({
  name: 'producers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.producers = action.payload;
      })
      .addCase(fetchProducers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProducerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProducerAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.producers.push(action.payload.producer);
      })
      .addCase(addProducerAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Failed to add producer';
      });
  },
});

export default producersSlice.reducer;
