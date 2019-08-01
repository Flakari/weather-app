import React, { useState, useEffect } from 'react';
import Form from './Form';
import Report from './Report';

function Weather({ windowSetup, formVisibility, formVisible }) {
    const [ weatherData, setWeatherData ] = useState({});
    const [ forecastData, setForecastData ] = useState({});
    const [ units, setUnits ] = useState('imperial');

    function updateWeatherData(data) {
        setWeatherData(data);
    }

    function updateForecastData(data) {
        setForecastData(data);
    }

    function updateUnits(event) {
        setUnits(event.target.name);
    }

    useEffect(() => {
        if (weatherData.hasOwnProperty('cod') && weatherData.cod == 200) {
            console.log('Success');
        } else {
            console.log('Error');
        }
        console.log(weatherData);
        console.log(forecastData);
    }, [ forecastData ]);

    return (
        <div>
            <Form 
                updateData={ updateWeatherData }
                updateForecast={ updateForecastData }
                units={ units }
                updateUnits={ updateUnits }
                windowSetup={ windowSetup }
                weatherData={ weatherData }
                formVisibility={ formVisibility }
                formVisible={ formVisible }
            />
            { (weatherData.hasOwnProperty('cod') && weatherData.cod == 200) ? <Report weatherData={ weatherData } units={ units } forecastData={ forecastData } windowSetup={ windowSetup }/> : null }
        </div>
    )
}

export default Weather;
