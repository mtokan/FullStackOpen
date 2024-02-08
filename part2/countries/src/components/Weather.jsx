import {useEffect, useState} from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY

const Weather = ({cityName, latlng}) => {
    const [weatherData, setWeatherData] = useState(null);
    const lat = latlng[0];
    const lon = latlng[1];

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
            .then(response => {
                setWeatherData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [lat, lon]);

    if (weatherData === null) {
        return null
    } else {
        const iconURL = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        return (
            <div>
                <h2>Weather in {cityName}</h2>
                <p>temperature: {weatherData.main.temp} Celsius</p>
                <img src={iconURL} alt={'Weather icon'}/>
                <p>wind: {weatherData.wind.speed} m/s</p>
            </div>
        )
    }
}

export default Weather;