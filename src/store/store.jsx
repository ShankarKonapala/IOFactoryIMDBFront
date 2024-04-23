import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";
import actorSlice from "./actorSlice";
import producerSlice from "./producerSlice";

const store = configureStore({
    reducer: {
        movies: moviesSlice,
        actors: actorSlice,
        producers: producerSlice
    }
});

export default store;