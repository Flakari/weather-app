import React, { useState, useEffect } from 'react';

function Form({ updateData, updateForecast, units, updateUnits, weatherData }) {
    const [ city, setCity ] = useState('');
    const [ history, setHistory ] = useState([]);
    const [ formattedHistory, setFormattedHistory ] = useState([]);

    function formChangeHandler(event) {
        setCity(event.target.value);
    }

    useEffect(() => {
        if (weatherData.hasOwnProperty('cod')) {
            historyChangeHandler();
        }
    }, [ weatherData ])

    function formatHistory() {
        // Format history into list of clickable buttons
    }

    function historyChangeHandler() {
        let newHistory = history;
        let city = `${ weatherData.name }, ${ weatherData.sys.country }`;

        if (newHistory.includes(city)) {
            newHistory = newHistory.filter(item => item !== city);
        }

        newHistory.unshift(city);

        if (newHistory.length > 5) { newHistory.pop(); }

        setHistory(newHistory);
    }

    function retrieveWeatherData(input, units) {
        const location = encodeURI(input);
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${ location }&units=${ units }&APPID=`;
        const fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?q=${ location }&units=${ units }&APPID=`;

        Promise.all([
            fetch(`${ URL }${ getKey() }`, { mode: 'cors' }),
            fetch(`${ fiveDayURL }${ getKey() }`, { mode: 'cors' })
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([res1, res2]) => {
            console.log('Called apis');
            if (res1.cod != 200) {
                updateData(res1);
                updateForecast(res2);
                //console.clear();
            } else {
                updateData(res1);
                updateForecast(res2);
            }   
        })
        .catch(error => {
            console.log(error);
        });

        function getKey() {
            return window.atob('MTExODcxNTRkYTcyZTNlNGY1MDUzOWEzNWRkYzgxNDQ=');
        }
    }

    return (
        <div id="form-container">
            <form id="weather-form" onSubmit={ (e) => { e.preventDefault(); retrieveWeatherData(city, units); }}>
                <input 
                    name="Location"
                    id="weather-input"
                    value={ city }
                    onChange={ formChangeHandler }
                />
                <input id="submit" type="submit" value="Submit" />
            </form>
            <div id="units-container">
                <input id="fahr" name="imperial" type="button" value ="F&deg;" onClick={ updateUnits }/>
                <input id="cel" name="metric" type="button" value ="C&deg;" onClick={ updateUnits } />
            </div>
            <div id="past-input-container">
                <p>{history.join(' ')}</p>
            </div>
        </div>
    )
}

export default Form;
