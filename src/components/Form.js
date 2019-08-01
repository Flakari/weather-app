import React, { useState, useEffect } from 'react';
import History from './History';
import Footer from './Footer';

function Form({ 
    updateData, updateForecast, units, updateUnits, windowSetup, weatherData, formVisible, formVisibility }) {
    const [ city, setCity ] = useState('');

    function formChangeHandler(event) {
        setCity(event.target.value);
    }

    async function retrieveWeatherData(input, units) {
        const location = encodeURI(input);
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${ location }&units=${ units }&APPID=`;
        const fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?q=${ location }&units=${ units }&APPID=`;

        const weatherPromise = Promise.all([
            fetch(`${ URL }${ getKey() }`, { mode: 'cors' }),
            fetch(`${ fiveDayURL }${ getKey() }`, { mode: 'cors' })
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .catch(error => {
            console.error(error);
        });

        const [ report, forecast ] = await weatherPromise;
        
        errorMessageDisplay(report);

        if (report.cod === 200) {
            formVisibility();
            updateData(report);
            updateForecast(forecast);
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
            error.textContent = `Error: ${ capitalize(response.message) }`;
        } else {
            errorCont.classList.remove('error-unhidden');
            error.textContent = '';
        }
    }

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div 
            id="form-container" 
            className={(windowSetup == 'narrow' && formVisible == false) ? 'hidden' : undefined}
        >
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
            <div id="error-container">
                <div id="error"></div>
            </div>
            <div id="search-info">
                <p>Search by zipcode or city name, zipcode is not reliable. If the wrong city appears, search using city or zipcode and country code. Ex: San Francisco, US. Country codes can be found here: <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements" target="_blank">Link</a></p>
            </div>
            <History setCity={ setCity } weatherData={ weatherData }/>
            { windowSetup === 'narrow' ? <Footer /> : null }
        </div>
    )
}

export default Form;
