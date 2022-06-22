import { configureStore } from "@reduxjs/toolkit";
import { weatherApiSlice } from "../features/weather/weatherApiSlice";

export const store = configureStore({
    reducer: {
        weather: weatherApiSlice.reducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;