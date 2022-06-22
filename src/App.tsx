import { useEffect, useState } from 'react';
import './App.scss';
import { FetchingStatus, useGetHourlyWeather } from './app/hooks';
import DayCard from './components/DayCard';
import WeatherAbstract from './components/WeatherAbstract';
import { Forecast, GetWeatherDate, WeatherData } from './objects/Weather';

function reduceForecastToDays(otherData: Forecast) {
	return otherData?.list?.reduce((days, current) => {
		const date = GetWeatherDate(current);

		if (days.findIndex(day => GetWeatherDate(day).getDay() == date.getDay()) == -1)
			days.push(current);

		return days;

	}, new Array<WeatherData>()).sort((a, b) => a.dt < b.dt ? -1 : 1);
}

function App() {
	
	const [selectedDay, setSelectedDay] = useState(new Date().getDay());

	const [dailyWeather, dailyWeatherFetchStatus] = useGetHourlyWeather();

	const [distinctDaysWeather, setDistinctDaysWeather] = useState<WeatherData[]>([]);

	useEffect(() => {
		if (dailyWeatherFetchStatus == FetchingStatus.Success) {
			if (dailyWeather != undefined)
				setDistinctDaysWeather(reduceForecastToDays(dailyWeather));
		}

	}, [dailyWeatherFetchStatus]);

	function handleDayClick(day: number) {
		setSelectedDay(day);
	}

	return (
		<div className='main-container'>
			<WeatherAbstract data={distinctDaysWeather[selectedDay]} status={dailyWeatherFetchStatus} />
			<div style={{ gridTemplateColumns: Array(distinctDaysWeather.length).fill('1fr').join(' ') }} className="day-cards-container">
				{distinctDaysWeather.map((dayWeather, index) =>
					<DayCard
						data={dayWeather}
						selectDay={handleDayClick}
						isActive={index == selectedDay}
						index={index}
						key={index}
					/>
				)}
			</div>
		</div>
	)
}

export default App;
