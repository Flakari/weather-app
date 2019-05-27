import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';

function Report( { weatherData, units, forecastData }) {
    const [ windUnits, setWindUnits ] = useState('');
    const [ windSpeed, setWindSpeed ] = useState('');
    const [ tempUnits, setTempUnits ] = useState('');
    const [ weatherIcon, setWeatherIcon ] = useState('');
    const [ time, setTime ] = useState(0);
    const [ sunrise, setSunrise] = useState(0);
    const [ sunset, setSunset ] = useState(0);

    useEffect(() => {
        setWindUnits(units == 'imperial' ? 'mph' : 'km/h');
        setWindSpeed(units == 'imperial' ? weatherData.wind.speed : metricWindSpeed(weatherData.wind.speed));
        setTempUnits(units == 'imperial' ? 'F' : 'C');
        
        setTime(getTimeValues(new Date()));
        setSunrise(getTimeValues(new Date(weatherData.sys.sunrise * 1000)));
        setSunset(getTimeValues(new Date(weatherData.sys.sunset * 1000)));
    }, [ weatherData ]);

    useEffect(() => {
        setWeatherIcon(getWeatherIcon(weatherData.weather[0].main, weatherData.weather[0].id, 'report'));
    });

    function metricWindSpeed(speed) {
        const M_TO_KM = 1 / 1000;
        const SEC_TO_HR = 3600;

        return (speed * M_TO_KM * SEC_TO_HR).toFixed(2);
    }

    function getWeatherIcon(weather, id, placement = '') {
        function timeConditional() {
            return (((time < sunrise) || (time > sunset)) && placement == 'report');
        }
        // Get sunrise and sunset values for clear
        // Also get cloudy icon for night as well
        if (weather == 'Clear') {
            if (timeConditional()) {
                return 'moon';
            } else {
                return 'sun';
            }
        } else if (weather == 'Clouds') {
            if (id == 801 || id == 802) {
                return 'cloudy';
            } else {
                return 'cloud';
            }
        } else if (weather == 'Rain' || weather == 'Drizzle') {
            return 'rain';
        } else if (weather == 'Thunderstorm' || id == 781) {
            return 'storm';
        } else if (weather == 'Snow') {
            return 'snowflake';
        } else {
            return 'cloud';
        }
    }

    function getTimeValues(time) {
        const hour = time.getUTCHours();
        const minutes = time.getUTCMinutes();
        const timezone = weatherData.timezone / 3600;
        let hourPlusTimezone = hour + timezone;

        if (hourPlusTimezone >= 24) {
            hourPlusTimezone -= 24;
        }

        if (hourPlusTimezone < 0) {
            hourPlusTimezone += 24;
        }

        console.log(hourPlusTimezone + (minutes / 60));
        return hourPlusTimezone + (minutes / 60);
    }

    function getWindDirection(deg) {
        if (deg >= 348.75 || deg <= 11.25) {
            return 'N';
        } else if (deg > 11.25 && deg < 33.75) {
            return 'NNE';
        } else if (deg >= 33.75 && deg <= 56.25) {
            return 'NE';
        } else if (deg > 56.25 && deg < 78.75) {
            return 'ENE';
        } else if (deg >= 78.75 && deg <= 101.25) {
            return 'E';
        } else if (deg > 101.25 && deg < 123.75) {
            return 'ESE';
        } else if (deg >= 123.75 && deg <= 146.25) {
            return 'SE';
        } else if (deg > 146.25 && deg < 168.75) {
            return 'SSE';
        } else if (deg >= 168.75 && deg <= 191.25) {
            return 'S';
        } else if (deg > 191.25 && deg < 213.75) {
            return 'SSW';
        } else if (deg >= 213.75 && deg <= 236.25) {
            return 'SW';
        } else if (deg > 236.25 && deg < 258.75) {
            return 'WSW';
        } else if (deg >= 258.75 && deg <= 281.25) {
            return 'W';
        } else if (deg > 281.25 && deg < 303.75) {
            return 'WNW';
        } else if (deg >= 303.75 && deg <= 326.25) {
            return 'NW';
        } else if (deg > 326.25 && deg < 348.75) {
            return 'NNW';
        }
    }

    return (
        <div>
            <article>
                <p>Weather Report</p>
                <p id="city">{ `${ weatherData.name}, ${ weatherData.sys.country }` }</p>
                <p id="temp">{ `Tempterature: ${ weatherData.main.temp }\xB0 ${ tempUnits }` }</p>
                <img id="report-icon" src={ `./src/icons/${ weatherIcon }.svg` }></img>
                <p id="humidity">{ `Humidity: ${ weatherData.main.humidity }%` }</p>
                <p id="weather">{ weatherData.weather[0].description }</p>
                <p id="wind">{ `Wind Speed: ${ windSpeed }${ windUnits } ${ getWindDirection(weatherData.wind.deg) }`}</p>
                <p>{ `Time: ${Math.floor(time)}:${Math.round((time % 1) * 60)}` }</p>
                <p>{ `Sunrise: ${Math.floor(sunrise)}:${Math.round((sunrise % 1) * 60)}` }</p>
                <p>{ `Sunset: ${Math.floor(sunset)}:${Math.round((sunset % 1) * 60)}` }</p>
            </article>
            <Forecast forecastData={ forecastData } tempUnits={ tempUnits } getIcon={ getWeatherIcon }/>
        </div>
    )
}

export default Report;
