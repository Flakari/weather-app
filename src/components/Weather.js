import React, { useState, useEffect } from 'react';
import Form from './Form';
import Report from './Report';

function Weather() {
    const [weatherData, setWeatherData] = useState({});
    const [units, setUnits] = useState('imperial');

    function updateWeatherData(data) {
        setWeatherData(data);
    }

    const weatherReport = () => {
        if (weatherData.hasOwnProperty('cod') && weatherData.cod == 200) {
            console.log(weatherData);
            return (
                <Report weatherData={ weatherData } />
            );
        } else {
            console.log(weatherData);
            return null;
        }
    };

    return (
        <div>
            <Form updateData={ updateWeatherData } units={ units } />
            { weatherReport() }
        </div>
    )
}

export default Weather;
