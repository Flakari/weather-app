import React, { useState, useEffect } from 'react';
import Form from './Form';
import Report from './Report';

function Weather({ windowSetup, formVisibility, formVisible }) {
    const [weatherData, setWeatherData] = useState({});
    const [forecastData, setForecastData] = useState({});
    const [units, setUnits] = useState(
        window.localStorage && window.localStorage.getItem('units') ?
            JSON.parse(window.localStorage.getItem('units')) : 'imperial'
    );
    const [city, setCity] = useState('');
    const [hidden, setHidden] = useState(window.localStorage && window.localStorage.getItem('history') ? true : false);

    useEffect(() => {
        if (!weatherData.hasOwnProperty('cod') && window.localStorage && window.localStorage.getItem('history') && window.localStorage.getItem('units')) {
            retrieveWeatherData(JSON.parse(window.localStorage.getItem('history'))[0], JSON.parse(window.localStorage.getItem('units')));
        } else {
            return;
        }
    }, []);

    function updateWeatherData(data) {
        setWeatherData(data);
    }

    function updateForecastData(data) {
        setForecastData(data);
    }

    function updateUnits(event) {
        if (window.localStorage) {
            const localStorage = window.localStorage;
            localStorage.setItem('units', JSON.stringify(event.target.name));
            setUnits(JSON.parse(localStorage.getItem('units')));
        } else {
            setUnits(event.target.name);
        }
    }

    function updateCity(newCity) {
        setCity(newCity);
    }

    async function retrieveWeatherData(input, units) {
        const location = encodeURI(input);
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=`;
        const fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&APPID=`;

        const weatherPromise = await Promise.all([
            fetch(`${URL}${getKey()}`, { mode: 'cors' }),
            fetch(`${fiveDayURL}${getKey()}`, { mode: 'cors' })
        ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .catch(error => {
                console.error(error);
            });

        const [report, forecast] = await weatherPromise;

        errorMessageDisplay(report);

        if (report.cod === 200) {
            formVisibility();
            updateWeatherData(report);
            updateForecastData(forecast);
            if (window.localStorage) {
                const localStorage = window.localStorage;
                localStorage.setItem('units', JSON.stringify(units));
                setUnits(JSON.parse(localStorage.getItem('units')));
            }
            if (hidden) {
                setTimeout(() => {
                    document.getElementById('form-container').style.visibility = 'visible';
                    document.getElementsByTagName('footer')[0].style.visibility = 'visible';
                    setHidden(false);
                }, 400);
            }
        } else {
            return;
        }

        function getKey() {
            return window.atob('MTExODcxNTRkYTcyZTNlNGY1MDUzOWEzNWRkYzgxNDQ=');
        }
    }

    function errorMessageDisplay(response) {
        const errorCont = document.getElementById('error-container');
        const error = document.getElementById('error');

        if (response.cod != 200) {
            errorCont.classList.add('error-unhidden');
            error.textContent = `Error: ${capitalize(response.message)}`;
        } else {
            errorCont.classList.remove('error-unhidden');
            error.textContent = '';
        }
    }

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        if (!hidden) {
            document.getElementById('form-container').style.visibility = 'visible';
            document.getElementsByTagName('footer')[0].style.visibility = 'visible';
        }
    }, [windowSetup]);

    return (
        <div>
            <Form
                units={units}
                updateUnits={updateUnits}
                windowSetup={windowSetup}
                weatherData={weatherData}
                formVisibility={formVisibility}
                formVisible={formVisible}
                retrieveWeatherData={retrieveWeatherData}
                city={city}
                updateCity={updateCity}
            />
            {(weatherData.hasOwnProperty('cod') && weatherData.cod === 200) ? <Report weatherData={weatherData} units={units} forecastData={forecastData} windowSetup={windowSetup} /> : null}
        </div>
    )
}

export default Weather;
