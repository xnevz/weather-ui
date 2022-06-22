import axios from "axios";
import { Forecast, GeoInfo, WeatherData } from "../objects/Weather";
import { CONSTANT_QUERY_PARAMS, HOURLY_WEATHER_URL } from "./consts";

export async function getWeatherAsync<TResult>(geoInfo: GeoInfo | undefined, url: string): Promise<TResult | undefined> {
    try {
        const resp = await axios.get<TResult>('./forecast.json', {
            // params: {
            //     ...CONSTANT_QUERY_PARAMS,
            //     lat: geoInfo?.lat,
            //     lon: geoInfo?.lon
            // },
        });
        return resp.data;
    } catch {
        return undefined;
    }
}

export async function getHourlyWeatherAsync(geoInfo : GeoInfo | undefined) {
    return await getWeatherAsync<Forecast>(geoInfo, HOURLY_WEATHER_URL);
}
