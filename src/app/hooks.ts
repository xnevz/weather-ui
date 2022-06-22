import axios from 'axios';
import { useEffect, useState } from 'react';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { Forecast, GeoInfo, WeatherData } from '../objects/Weather';
import { HOURLY_WEATHER_URL, WEATHER_URL } from '../api/consts';
import { getWeatherAsync } from '../api/weather';

export enum FetchingStatus {
    Fetching,
    Failure,
    Success
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useGeolocation(): GeoInfo | undefined {

    const [geoInfo, setGeoInfo] = useState<GeoInfo | undefined>(undefined);

    useEffect(() => {
        const geo = navigator.geolocation;
        geo.getCurrentPosition((pos => {
            setGeoInfo({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            } as GeoInfo);
        }));
    }, []);

    return geoInfo;
};

function useGetWeatherGeneric<TResult>(url: string): [TResult | undefined, FetchingStatus] {
    const geoInfo = useGeolocation();
    
    const [result, setResult] = useState<TResult | undefined>(undefined);
    const [status, setStatus] = useState(FetchingStatus.Fetching);

    useEffect(() => {
        if (geoInfo != undefined && !isNaN(geoInfo.lat) && !isNaN(geoInfo.lon)) {
            getWeatherAsync<TResult>(geoInfo, url).then((response) => {
                setResult(response);
                setStatus(FetchingStatus.Success);
            }).catch((reason) => {
                setResult(undefined);
                setStatus(FetchingStatus.Failure);
            });
        }

    }, [geoInfo]);

    return [result, status];
}

export function useGetWeather(): [WeatherData | undefined, FetchingStatus] {
    return useGetWeatherGeneric(WEATHER_URL);
};

export function useGetHourlyWeather(): [Forecast | undefined, FetchingStatus] {
    return useGetWeatherGeneric(HOURLY_WEATHER_URL);
};