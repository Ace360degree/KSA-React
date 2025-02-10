import { configureStore } from "@reduxjs/toolkit";
import expertiseReducer from './slices/expertiseSlice';
import ideasReducer from './slices/ideasSlices';

export const store = configureStore({
    reducer:{
        expertise:expertiseReducer,
        ideas:ideasReducer,
    }
});

