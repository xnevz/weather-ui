export interface WeatherData {
    coord: {
        lon: number,
        lat: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number,
        temp_kf: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number,
        pod: string
    },
    timezone: number,
    id: number,
    pop: number,
    name: string,
    cod: number,
    dt_txt: string
};

export interface Forecast {
    cod: string,
    message: number,
    cnt: number,
    list: [WeatherData],
    city: {
        id: number,
        name: string,
        coord: {
            lat: number,
            lon: number
        },
        country: string,
        population: number,
        timezone: number,
        sunrise: number,
        sunset: number
    }
}

export interface GeoInfo {
    lat: number;
    lon: number;
}

export interface Weather {
    activeWeatherData: WeatherData

    selectedDay: number

    otherWeatherData: Forecast | undefined
};

export function GetWeatherDate(weather: WeatherData): Date {
    return new Date(weather.dt * 1000);
}