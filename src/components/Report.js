import React, { useState, useEffect } from 'react';

function Report( { weatherData, units }) {
    const [ windUnits, setWindUnits ] = useState('');
    const [ windSpeed, setWindSpeed ] = useState('');
    const [ tempUnits, setTempUnits ] = useState('');

    useEffect(() => {
        setWindUnits(units == 'imperial' ? 'mph' : 'km/h');
        setWindSpeed(units == 'imperial' ? weatherData.wind.speed : metricWindSpeed(weatherData.wind.speed));
        setTempUnits(units == 'imperial' ? 'F' : 'C');
        console.log('units updated');
    }, [ weatherData ]);

    function metricWindSpeed(speed) {
        const M_TO_KM = 1 / 1000;
        const SEC_TO_HR = 3600;

        return (speed * M_TO_KM * SEC_TO_HR).toFixed(2);
    }

    function weatherIcon(weather) {
        // Inserts icon based on weather conditions and possible time of day
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
        <article>
            <p>Weather Report</p>
            <p>{ `${ weatherData.name}, ${ weatherData.sys.country }` }</p>
            <p id="temp">{ `Tempterature: ${ weatherData.main.temp }\xB0 ${ tempUnits }` }</p>
            <p id="humidity">{ `Humidity: ${ weatherData.main.humidity }%` }</p>
            <p id="weather">{ weatherData.weather[0].description }</p>
            <p id="wind">{ `Wind Speed: ${ windSpeed }${ windUnits } ${ getWindDirection(weatherData.wind.deg) }`}</p>
        </article>
    )
}

export default Report;
