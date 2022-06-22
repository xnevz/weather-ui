import { DAYS } from '../api/consts';
import { FetchingStatus } from '../app/hooks';
import { weatherCodes } from '../constants';
import { GetWeatherDate, WeatherData } from '../objects/Weather';

const today = new Date().getDay();

export default function WeatherAbstract({ data, status }: { data: WeatherData, status: FetchingStatus }) {
	if (data == undefined)
		return <p>Select a day</p>;

		const date = GetWeatherDate(data);

	switch (status) {
		case FetchingStatus.Failure:
			return <p>Network Error</p>;
		case FetchingStatus.Fetching:
			return <p>Fecthing Data ...</p>;
		case FetchingStatus.Success:
			return (
				<div className='weather-abstract blur-back'>
					<div className='day-icon'>
						<img src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}.png`} alt='' className='icon' />
						<div className='text-container'>
							<h1 className='big-day'>{date.getDay() == today ? 'Today' : DAYS[date.getDay()]}</h1>
							<p className='date'>{date.toDateString()}</p>
						</div>
					</div>
					<div className='degree-location'>
						<h1 className='degree'>{data?.main.temp.toFixed(0)}</h1>
						<p className='location'>{data?.name}</p>
					</div>
					<div className='feels-like'>
						<p>Feels like {weatherCodes[data?.weather[0].id]}</p>
					</div>
				</div>
			);
	}
}
