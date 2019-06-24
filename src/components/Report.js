import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';

function Report({ weatherData, units, forecastData, windowSetup }) {
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
        
        setTime(getTimeValues( new Date(+ new Date() + (weatherData.timezone * 1000)) ));
        
        if (weatherData.sys.sunrise == 0 && weatherData.sys.sunset == 0) {
            setSunrise('-');
            setSunset('-');
        } else {
            setSunrise(getTimeValues( new Date((weatherData.sys.sunrise * 1000) + (weatherData.timezone * 1000)) ));
            setSunset(getTimeValues( new Date((weatherData.sys.sunset * 1000) + (weatherData.timezone * 1000)) ));
        }
    }, [ weatherData ]);

    useEffect(() => {
        setWeatherIcon(getWeatherIcon(weatherData.weather[0].main, weatherData.weather[0].id, 'report'));
    });

    useEffect(() => {
        const report = document.getElementById('report-container');

        windowSetup == 'wide' ? report.classList.add('report-wide') : report.classList.remove('report-wide');
    }, [ windowSetup ]);

    function metricWindSpeed(speed) {
        const M_TO_KM = 1 / 1000;
        const SEC_TO_HR = 3600;

        return (speed * M_TO_KM * SEC_TO_HR).toFixed(2);
    }

    function getWeatherIcon(weather, id, placement = '') {
        function timeConditional() {
            return (((time < sunrise) || (time > sunset)) && placement == 'report');
        }
        // Get cloudy icon for night as well
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

    function getTimeValues(time, placement = '') {
        const hour = time.getUTCHours();
        const minutes = time.getUTCMinutes();
        const date = time.getUTCDate();
        const day = getDayOrMonth(time.getUTCDay(), 'day');
        const month = getDayOrMonth(time.getUTCMonth(), 'month');

        if (hour >= 24) { hour -= 24; }
        if (hour < 0) { hour += 24; }

        return placement == '' ? hour + (minutes / 60) : {hour: hour, date: date, day: day, month: month};
    }

    function getDayOrMonth(value, type) {
        const daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        if (type == 'day') {
            return daysArray[value];
        } else {
            return monthsArray[value];
        }
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

    function formatTime(time) {
        let hour = Math.floor(time);
        let minutes = Math.floor((time % 1) * 60);
        let beforeNoon = true;

        if (hour > 12) {
            hour = hour - 12;
            beforeNoon = false;
        }

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        let formattedTime = `${hour}:${minutes}`;

        return beforeNoon == true ? `${formattedTime} AM` : `${formattedTime} PM`;
    }

    return (
        <div id="report-container">
            <section id="report">
                <p id="city">{ `${ weatherData.name}, ${ weatherData.sys.country }` }</p>
                <p id="weather">{ weatherData.weather[0].description }</p>
                
                <img id="report-icon" src={ `./src/icons/${ weatherIcon }.svg` }></img>
                <p id="temp">{`${ weatherData.main.temp }\xB0`}<span>{tempUnits}</span></p>
                <p id="humidity">{ `Humidity: ${ weatherData.main.humidity }%` }</p>
                
                <p id="wind">{ `Wind Speed: ${ windSpeed }${ windUnits } ${ getWindDirection(weatherData.wind.deg) }`}</p>
                <p>{ `Time: ${formatTime(time)}` }</p>
                <p>{ isNaN(sunrise) ? 'Sunrise: -' : `Sunrise: ${formatTime(sunrise)}` }</p>
                <p>{ isNaN(sunset) ? 'Sunset: -' : `Sunset: ${formatTime(sunset)}` }</p>
            </section>
            <Forecast 
                forecastData={ forecastData } 
                tempUnits={ tempUnits } 
                getIcon={ getWeatherIcon } 
                getTime={ getTimeValues }
                timezone={ weatherData.timezone }
                windowSetup={ windowSetup }
            />
        </div>
    )
}

export default Report;
