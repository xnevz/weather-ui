import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Forecast, GetWeatherDate, Weather, WeatherData } from '../../objects/Weather';

const initialState: Weather = {
    activeWeatherData: {
        coord: {
            lon: 0,
            lat: 0
        },
        weather: [
            {
                id: 0,
                main: '',
                description: '',
                icon: ''
            }
        ],
        base: '',
        main: {
            temp: 0,
            feels_like: 0,
            temp_min: 0,
            temp_max: 0,
            pressure: 0,
            humidity: 0,
            grnd_level: 0,
            sea_level: 0,
            temp_kf: 0
        },
        visibility: 0,
        wind: {
            speed: 0,
            deg: 0,
            gust: 0
        },
        clouds: {
            all: 0
        },
        dt: 0,
        sys: {
            type: 0,
            id: 0,
            country: '',
            sunrise: 0,
            sunset: 0,
            pod: ''
        },
        timezone: 0,
        id: 0,
        name: '',
        cod: 0,
        dt_txt: '',
        pop: 0
    },
    selectedDay: -1,
    otherWeatherData: undefined
};

export const weatherApiSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather(state, action: PayloadAction<WeatherData | undefined>) {
            if (action.payload != undefined) {
                state.activeWeatherData = action.payload;
            }
        },
        setOtherWeather(state, action: PayloadAction<Forecast | undefined>) {
            if (action.payload != undefined) {
                state.otherWeatherData = action.payload;
            }
        },
        setSelectedDay(state, action: PayloadAction<number>) {
            state.selectedDay = action.payload;
            console.log(state.selectedDay);
        }
    }
});

export const { setWeather, setSelectedDay, setOtherWeather } = weatherApiSlice.actions;