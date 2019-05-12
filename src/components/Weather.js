import React, { useState, useEffect } from 'react';
import Form from './Form';
import Report from './Report';

function Weather() {
    const [weatherData, setWeatherData] = useState({});
    const [units, setUnits] = useState('imperial');

    function updateWeatherData(data) {
        setWeatherData(data);
    }

    function updateUnits(event) {
        setUnits(event.target.name);
    }

    useEffect(() => {
        console.log(units);
    }, [units])

    useEffect(() => {
        if (weatherData.hasOwnProperty('cod') && weatherData.cod == 200) {
            console.log(weatherData);
            console.log('Success');
        } else {
            console.log(weatherData);
            console.log('Error');
        }
    }, [weatherData]);

    return (
        <div>
            <Form 
                updateData={ updateWeatherData } 
                units={ units }
                updateUnits={ updateUnits } 
            />
            { (weatherData.hasOwnProperty('cod') && weatherData.cod == 200) ? <Report weatherData={ weatherData } units={ units } /> : null }
        </div>
    )
}

export default Weather;
