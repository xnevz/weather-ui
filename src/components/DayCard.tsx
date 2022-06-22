import { DAYS } from '../api/consts'
import { GetWeatherDate, WeatherData } from '../objects/Weather';

export default function DayCard({ data, index, isActive, selectDay }: { data: WeatherData, index: number, isActive: boolean, selectDay: (index: number) => void }) {

    const day = DAYS[GetWeatherDate(data).getDay()];

    return (
        <div
            onClick={() => selectDay(index)}
            className={"blur-back day-card" + (isActive ? ' active' : '')}>
            <p className='title'>{day?.substring(0, 3)}</p>
            <img src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png`} alt='' className='icon' />
            <p className='degree'>{data.main.temp}</p>
        </div>
    )
}